import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";
import "server-only";

const _getTotalSales = async (): Promise<number> => {
  const totalSales = await db.sale.count();
  return totalSales;
};

export const getTotalSales = unstable_cache(
  async () => _getTotalSales(),
  ["get-dashboard"],
  { tags: ["get-dashboard"], revalidate: 120 },
);
