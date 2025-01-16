import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";
import "server-only";

const _getTotalStock = async (): Promise<number> => {
  const totalStock = await db.product.aggregate({
    _sum: {
      stock: true,
    },
  });

  return Number(totalStock._sum.stock);
};

export const getTotalStock = unstable_cache(
  async () => _getTotalStock(),
  ["get-dashboard"],
  { tags: ["get-dashboard"], revalidate: 120 },
);
