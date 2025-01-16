import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";
import "server-only";

const _getTotalRevenue = async (): Promise<number> => {
  const totalRevenue = await db.$queryRaw<[{ total: number }]>`
    SELECT SUM(quantity * "unitPrice") as total 
    FROM "SaleProduct"
    `;
  return Number(totalRevenue[0].total);
};

export const getTotalRevenue = unstable_cache(
  async () => _getTotalRevenue(),
  ["get-dashboard"],
  { tags: ["get-dashboard"], revalidate: 120 },
);
