"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/dropdown-menu";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ColumnDef } from "@tanstack/react-table";
import {
  Circle,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react";

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
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <MoreHorizontal size={24} className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              
              <DropdownMenuItem
                className="gap-1.5"
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                <ClipboardCopyIcon />
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-1.5">
                <EditIcon />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-1.5"><TrashIcon />Deletar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
