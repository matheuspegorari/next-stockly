"use server";
import { db } from "@/app/_lib/prisma";
import { revalidateTag } from "next/cache";
import { deleteProductSchema, DeleteProductSchema } from "./schema";

export const deleteProduct = async ({ id }: DeleteProductSchema) => {
  deleteProductSchema.parse({ id });
  await db.product.delete({
    where: {
      id,
    },
  });
  revalidateTag("get-products");
};
