import { db } from "@/app/_lib/prisma";

export const getTotalRevenue = async (): Promise<number> => {
  const totalRevenue = await db.$queryRaw<[{ total: number }]>`
    SELECT SUM(quantity * "unitPrice") as total 
    FROM "SaleProduct"
    `;
  return Number(totalRevenue[0].total);
};
