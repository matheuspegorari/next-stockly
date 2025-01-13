import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "server-only";

dayjs.extend(utc);
dayjs.extend(timezone);

const today = dayjs().endOf("day").tz("America/Sao_Paulo");

export const getTodayRevenue = async (): Promise<number> => {
  const todayRevenue = await db.$queryRaw<[{ total: number }]>`
    SELECT SUM(sp.quantity * sp."unitPrice") as total 
    FROM "SaleProduct" sp
    INNER JOIN "Sale" s ON s.id = sp."saleId"
    WHERE DATE(s.date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo') = DATE(${today.format("YYYY-MM-DD")})
  `;

  return Number(todayRevenue[0].total);
};
