"use client";

import { Badge } from "@/app/_components/ui/badge";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ColumnDef } from "@tanstack/react-table";
import { Circle } from "lucide-react";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Esgotado";
};

export const productTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Vlr. Unitário",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);
      return (
        <>
          <Badge
            variant={product.status === "IN_STOCK" ? "default" : "destructive"}
            className="gap-2"
          >
            <Circle
              className={
                product.status === "IN_STOCK"
                  ? "fill-primary-foreground"
                  : "fill-destructive-foreground"
              }
              size={8}
            />
            {label}
          </Badge>
        </>
      );
    },
  },
];
