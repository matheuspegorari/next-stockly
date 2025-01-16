import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";
import "server-only";

const _getTotalProducts = async (): Promise<number> => {
  const totalProducts = await db.product.count();
  return totalProducts;
};

export const getTotalProducts = unstable_cache(
  async () => _getTotalProducts(),
  ["get-dashboard"],
  { tags: ["get-dashboard"], revalidate: 120 },
);
