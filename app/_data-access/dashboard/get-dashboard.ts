import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import "server-only";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}
interface DashboardDto {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
}

dayjs.extend(utc);
dayjs.extend(timezone);

export const getDashboard = async (): Promise<DashboardDto> => {
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

  const totalRevenuePromise = db.$queryRaw<[{ total: number }]>`
  SELECT SUM(quantity * "unitPrice") as total 
  FROM "SaleProduct"
`;

  const todayRevenuePromise = db.$queryRaw<[{ total: number }]>`
  SELECT SUM(sp.quantity * sp."unitPrice") as total 
  FROM "SaleProduct" sp
  INNER JOIN "Sale" s ON s.id = sp."saleId"
  WHERE DATE(s.date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo') = DATE(${today.format("YYYY-MM-DD")})
`;

  const totalSalesPromise = db.sale.count();

  const totalStockPromise = db.product.aggregate({
    _sum: {
      stock: true,
    },
  });

  const totalProductsPromise = db.product.count();

  const [totalRevenue, todayRevenue, totalSales, totalStock, totalProducts] =
    await Promise.all([
      totalRevenuePromise,
      todayRevenuePromise,
      totalSalesPromise,
      totalStockPromise,
      totalProductsPromise,
    ]);
  return {
    totalRevenue: Number(totalRevenue[0].total),
    todayRevenue: Number(todayRevenue[0].total),
    totalSales,
    totalStock: Number(totalStock._sum.stock),
    totalProducts,
    totalLast14DaysRevenue,
  };
};
