"use client";

import ProductStatusBadge from "@/app/_components/product-status-badge";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ColumnDef } from "@tanstack/react-table";
import ProductTableDropdownMenu from "./table-dropdown";

export const productTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Vlr. Unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(product.price);
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      return (
        <>
          <ProductStatusBadge status={row.row.original.status} />
        </>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      return <ProductTableDropdownMenu product={product} />;
    },
  },
];
