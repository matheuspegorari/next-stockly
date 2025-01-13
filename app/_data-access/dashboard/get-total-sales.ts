import { db } from "@/app/_lib/prisma";
import "server-only";

export const getTotalSales = async (): Promise<number> => {
  const totalSales = await db.sale.count();
  return totalSales;
};
