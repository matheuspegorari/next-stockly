import { z } from "zod";

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, { message: "Nome do produto é obrigatório." }),
  price: z
    .number()
    .min(0.01, { message: "Preço do produto deve ser maior que 0." }),
  stock: z.coerce
    .number()
    .int()
    .positive("Quantidade em estoque deve ser positiva."),
});

export type UpsertProductSchemaType = z.infer<typeof upsertProductSchema>;
