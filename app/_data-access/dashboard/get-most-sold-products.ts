import { ProductStatusDto } from "@/app/_data-access/product/get-products";
import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";
import "server-only";

export interface MostSoldProductsDto {
  productId: string;
  name: string;
  totalSold: number;
  price: number;
  status: ProductStatusDto;
}

const _getMostSoldProducts = async (): Promise<MostSoldProductsDto[]> => {
  const mostSoldProductsQuery = `
        SELECT P."id" as "productId", P."name", p.price, sum(sp.quantity) AS "totalSold", p.stock  FROM "SaleProduct" sp
        INNER JOIN "Product" p ON P.id = SP."productId"
        GROUP BY P."id", p.name, p.price, p.stock 
        ORDER BY "totalSold" DESC
        LIMIT 5
    `;

  const mostSoldProducts = await db.$queryRawUnsafe<
    {
      productId: string;
      name: string;
      price: number;
      totalSold: number;
      stock: number;
    }[]
  >(mostSoldProductsQuery);

  return mostSoldProducts.map((product) => ({
    ...product,
    totalSold: Number(product.totalSold),
    price: Number(product.price),
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};

export const getMostSoldProducts = unstable_cache(
  async () => _getMostSoldProducts(),
  ["get-dashboard"],
  { tags: ["get-dashboard"], revalidate: 120 },
);
