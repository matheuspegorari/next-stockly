"use server";
import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { revalidatePath } from "next/cache";
import { deleteSaleSchema } from "./schema";

export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.sale.delete({
      where: {
        id,
      },
    });
    revalidatePath("/sales");
  });
