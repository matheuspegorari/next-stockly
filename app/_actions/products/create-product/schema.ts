import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome do produto é obrigatório." }),
  price: z
    .number()
    .min(0.01, { message: "Preço do produto deve ser maior que 0." }),
  stock: z.coerce
    .number()
    .int()
    .positive("Quantidade em estoque deve ser positiva."),
});

export type CreateProductSchemaType = z.infer<typeof createProductSchema>;
