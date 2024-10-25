import "server-only";

import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import { unstable_cache } from "next/cache";

export type ProductStatusDto = "IN_STOCK" | "OUT_OF_STOCK";

export interface ProductDto extends Omit<Product, "price"> {
  price: number;
  status: ProductStatusDto;
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const products = await db.product.findMany({});
  return products.map((product) => ({
    ...product,
    price: Number(product.price),
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};

export const cachedGetRandomNumber = unstable_cache(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return Math.floor(Math.random() * 100);
  },
  ["get-random-number"],
  { revalidate: 120 },
);

export const cachedGetProducts = unstable_cache(
  async () => getProducts(),
  ["get-products"],
  { tags: ["get-products"], revalidate: 120 },
);
