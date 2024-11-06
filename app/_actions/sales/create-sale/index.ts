"use server";
import { db } from "@/app/_lib/prisma";
import { createSaleSchema, CreateSaleSchemaType } from "./schema";
import { revalidateTag } from "next/cache";

export const createSale = async (data: CreateSaleSchemaType) => {
  createSaleSchema.parse(data); // valida os dados
  const sale = await db.sale.create({
    data: {
      date: new Date(),
    },
  });
  for (const product of data.products) {
    const productFromDb = await db.product.findUnique({
      where: { id: product.id },
    });
    if (!productFromDb) {
      throw new Error("Product not found");
    }

    const productIsOutOfStock = product.quantity > productFromDb.stock;
    if (productIsOutOfStock) {
      throw new Error("Product is out of stock");
    }
    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDb.price,
      },
    });

    await db.product.update({
      where: { id: product.id },
      data: {
        stock: {
          decrement: product.quantity,
        },
      },
    });
  }
  revalidateTag("get-products");
};
