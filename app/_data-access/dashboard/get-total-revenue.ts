import { db } from "@/app/_lib/prisma";

export const getTotalRevenue = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const totalRevenuePromise = db.$queryRaw<[{ total: number }]>`
    SELECT SUM(quantity * "unitPrice") as total 
    FROM "SaleProduct"
    `;

  const totalRevenue = await totalRevenuePromise;
  return Number(totalRevenue[0].total);
};
