"use server";
import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { revalidateTag } from "next/cache";
import { deleteProductSchema } from "./schema";

export const deleteProduct = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.product.delete({
      where: {
        id,
      },
    });
    revalidateTag("get-products");
  });
