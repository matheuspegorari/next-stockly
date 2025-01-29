import { db } from "@/app/_lib/prisma";
import "server-only";

interface SaleProductDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}
export interface SaleDto {
  id: string;
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
  saleProducts: SaleProductDto[];
}

export const getSales = async (): Promise<SaleDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return sales.map(
    (sale): SaleDto => ({
      id: sale.id,
      date: sale.date,
      productNames: sale.saleProducts.map(sp => sp.product.name).join(" • "),
      totalAmount: sale.saleProducts.reduce(
        (acc, saleProduct) =>
          acc + saleProduct.quantity * Number(saleProduct.unitPrice),
        0,
      ),
      totalProducts: sale.saleProducts.reduce(
        (acc, saleProduct) => acc + saleProduct.quantity,
        0,
      ),
      saleProducts: sale.saleProducts.map(sp => ({
        productId: sp.product.id,
        quantity: sp.quantity,
        unitPrice: Number(sp.unitPrice),
        productName: sp.product.name
      })),
    }),
  );
};
