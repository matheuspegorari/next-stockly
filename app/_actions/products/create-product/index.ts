"use server";
import { db } from "@/app/_lib/prisma";
import { revalidateTag } from "next/cache";
import { upsertProductSchema, UpsertProductSchemaType } from "./schema";

export const upsertProduct = async (data: UpsertProductSchemaType) => {
  upsertProductSchema.parse(data);
  await db.product.upsert({
    where: { id: data.id ?? ""},
    create: data,
    update: data,
  });
  revalidateTag("get-products");
};
