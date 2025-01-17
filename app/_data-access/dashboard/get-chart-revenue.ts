import dayjs from "@/app/_lib/dayjs";
import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";
import "server-only";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}

const _getChartRevenue = async (): Promise<DayTotalRevenue[]> => {
  const today = dayjs().tz("America/Sao_Paulo").startOf("day");
  
  // Generate array of dates for the WHERE IN clause
  const dates = Array.from({ length: 14 }).map((_, index) => {
    return today.subtract(index, "day").format("YYYY-MM-DD");
  });

  const revenues = await db.$queryRaw<Array<{ date: string; total: number | null }>>`
    SELECT 
      TO_CHAR(d.date::date, 'DD/MM') as date,
      COALESCE(SUM(sp.quantity * sp."unitPrice"), 0) as total
    FROM unnest(${dates}::date[]) WITH ORDINALITY AS d(date, ord)
    LEFT JOIN "Sale" s ON 
      DATE(s.date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo') = d.date
    LEFT JOIN "SaleProduct" sp ON sp."saleId" = s.id
    GROUP BY d.date, d.ord
    ORDER BY d.ord ASC`;

  return revenues.map(row => ({
    day: row.date,
    totalRevenue: Number(row.total || 0)
  }));
};

export const getChartRevenue = unstable_cache(
  async () => _getChartRevenue(),
  ["get-dashboard"],
  { tags: ["get-dashboard"], revalidate: 120 },
);