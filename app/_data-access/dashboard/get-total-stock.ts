import { db } from "@/app/_lib/prisma";
import "server-only";

export const getTotalStock = async (): Promise<number> => {
  const totalStock = await db.product.aggregate({
    _sum: {
      stock: true,
    },
  });

  return Number(totalStock._sum.stock);
};
