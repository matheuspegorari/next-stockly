import { db } from "@/app/_lib/prisma";
import "server-only";

export const getTotalProducts = async (): Promise<number> => {
  const totalProducts = await db.product.count();
  return totalProducts;
};
