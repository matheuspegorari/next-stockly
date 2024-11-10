"use server";
import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";
import { revalidateTag } from "next/cache";
import { createSaleSchema } from "./schema";

export const createSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { products } }) => {
    throw new Error();
    await db.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        // cria a venda
        data: {
          date: new Date(),
        },
      });
      for (const product of products) {
        // cria os produtos da venda
        const productFromDb = await db.product.findUnique({
          where: { id: product.id },
        });
        if (!productFromDb) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Product not found"],
          });
        }

        const productIsOutOfStock = product.quantity > productFromDb.stock;
        if (productIsOutOfStock) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Product is out of stock"],
          });
        }
        await tx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price,
          },
        });

        await tx.product.update({
          // atualiza o estoque
          where: { id: product.id },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });
      }
    });

    revalidateTag("get-products");
  });
