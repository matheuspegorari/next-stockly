import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "server-only";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}

dayjs.extend(utc);
dayjs.extend(timezone);

export const getChartRevenue = async (): Promise<DayTotalRevenue[]> => {
  const today = dayjs().endOf("day").tz("America/Sao_Paulo");
  const last14Days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(
    (day) => {
      return today.subtract(day, "day").toDate();
    },
  );

  const totalLast14DaysRevenue: DayTotalRevenue[] = [];

  for (const day of last14Days) {
    const totalRevenue = await db.$queryRaw<[{ total: number | null }]>`
        SELECT COALESCE(SUM(sp.quantity * sp."unitPrice"), 0) as total 
        FROM "SaleProduct" sp
        INNER JOIN "Sale" s ON s.id = sp."saleId"
        WHERE DATE(s.date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo') = 
                    DATE(${dayjs(day).tz("America/Sao_Paulo").format("YYYY-MM-DD")})
    `;

    totalLast14DaysRevenue.push({
      day: dayjs(day).tz("America/Sao_Paulo").format("DD/MM"),
      totalRevenue: Number(totalRevenue[0].total || 0),
    });
  }

  return totalLast14DaysRevenue;
};
