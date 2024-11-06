"use server";
import { db } from "@/app/_lib/prisma";
import { revalidateTag } from "next/cache";
import { createSaleSchema, CreateSaleSchemaType } from "./schema";

export const createSale = async (data: CreateSaleSchemaType) => {
  createSaleSchema.parse(data); // valida os dados

  await db.$transaction(async (tx) => {
    const sale = await tx.sale.create({ // cria a venda
      data: {
        date: new Date(),
      },
    });
    for (const product of data.products) { // cria os produtos da venda
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
      await tx.saleProduct.create({
        data: {
          saleId: sale.id,
          productId: product.id,
          quantity: product.quantity,
          unitPrice: productFromDb.price,
        },
      });

      await tx.product.update({ // atualiza o estoque
        where: { id: product.id },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      });
    }
  });

  revalidateTag("get-products"); // invalida o cache
};
