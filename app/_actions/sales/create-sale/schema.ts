import { LucideClipboardType } from "lucide-react";
import { z } from "zod";

export const createSaleSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type CreateSaleSchemaType = z.infer<typeof createSaleSchema>;
