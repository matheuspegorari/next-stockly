"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createProductSchema, CreateProductSchemaType } from "./schema";

export const createProduct = async (data: CreateProductSchemaType) => {
  createProductSchema.parse(data);
  await db.product.create({ data });
  revalidatePath("/products");
};
