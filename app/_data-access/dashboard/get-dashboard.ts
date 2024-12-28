import { db } from "@/app/_lib/prisma";

interface DashboardDto {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number; 
  totalStock: number;
  totalProducts: number;
}
export const getDashboard = async (): Promise<DashboardDto> => {
  const totalRevenuePromise = db.$queryRaw<[{ total: number }]>`
  SELECT SUM(quantity * "unitPrice") as total 
  FROM "SaleProduct"
`;

const todayRevenuePromise = db.$queryRaw<[{ total: number }]>`
  SELECT SUM(sp.quantity * sp."unitPrice") as total 
  FROM "SaleProduct" sp
  INNER JOIN "Sale" s ON s.id = sp."saleId"
  WHERE DATE(s.date) = DATE(NOW())
`;

  const totalSalesPromise = db.sale.count();

  const totalStockPromise = db.product.aggregate({
    _sum: {
      stock: true,
    },
  });

  const totalProductsPromise = db.product.count();

  const [totalRevenue, todayRevenue, totalSales, totalStock, TotalProducts] =
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
    totalProducts: TotalProducts,
  };
};
