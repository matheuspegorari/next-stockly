import { ProductStatusDto } from "@/app/_data-access/product/get-products";
import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import "server-only";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}

export interface MostSoldProductsDto {
  productId: string;
  name: string;
  totalSold: number;
  price: number;
  status: ProductStatusDto;
}

interface DashboardDto {
  totalSales: number;
  totalStock: number;
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
  mostSoldProducts: MostSoldProductsDto[];
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

  const totalSalesPromise = db.sale.count();

  const totalStockPromise = db.product.aggregate({
    _sum: {
      stock: true,
    },
  });

  const totalProductsPromise = db.product.count();

  const mostSoldProductsQuery = `
    SELECT P."id" as "productId", P."name", p.price, sum(sp.quantity) AS "totalSold", p.stock  FROM "SaleProduct" sp
    INNER JOIN "Product" p ON P.id = SP."productId"
    GROUP BY P."id", p.name, p.price, p.stock 
    ORDER BY "totalSold" DESC
    LIMIT 5
  `;

  const mostSoldProductsPromise = await db.$queryRawUnsafe<
    {
      productId: string;
      name: string;
      price: number;
      totalSold: number;
      stock: number;
    }[]
  >(mostSoldProductsQuery);

  const [
    totalSales,
    totalStock,
    totalProducts,
    mostSoldProducts,
  ] = await Promise.all([
    totalSalesPromise,
    totalStockPromise,
    totalProductsPromise,
    mostSoldProductsPromise,
  ]);
  return {
    totalSales,
    totalStock: Number(totalStock._sum.stock),
    totalProducts,
    totalLast14DaysRevenue,
    mostSoldProducts: mostSoldProducts.map((product) => ({
      ...product,
      totalSold: Number(product.totalSold),
      price: Number(product.price),
      status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    })),
  };
};
