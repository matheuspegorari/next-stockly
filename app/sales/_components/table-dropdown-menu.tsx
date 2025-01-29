import { deleteSale } from "@/app/_actions/sales/delete-sale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { SaleDto } from "@/app/_data-access/sales/get-sales";
import UpsertSalesSheetContent from "@/app/sales/_components/upsert-sheet-content";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

interface SaleTableDropdownMenuProps {
  sale: Pick<SaleDto, "id" | "saleProducts">;
  productOptions: ComboboxOption[];
  products: ProductDto[];
}

const SalesTableDropdownMenu = ({
  sale,
  productOptions,
  products,
}: SaleTableDropdownMenuProps) => {
  const { execute: executeDelete } = useAction(deleteSale, {
    onExecute: () => {
      toast.loading("Deletando venda...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Venda deletada com sucesso!");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Erro ao deletar a venda!");
    },
  });
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleConfirmDeleteClick = () => executeDelete({ id: sale.id });
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <MoreHorizontal size={24} className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => {
                navigator.clipboard.writeText(sale.id);
                toast.success("ID copiado para a área de transferência.");
              }}
            >
              <ClipboardCopyIcon />
              Copiar ID
            </DropdownMenuItem>
            <SheetTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <EditIcon />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>
            <AlertDialogTrigger>
              <DropdownMenuItem className="gap-1.5">
                <TrashIcon />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a deletar esta venda. Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteClick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <UpsertSalesSheetContent
        saleId={sale.id}
        products={products}
        productOptions={productOptions}
        defaultSelectedProducts={sale.saleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          name: saleProduct.productName,
          price: saleProduct.unitPrice,
        }))}
        onSubmitSuccess={() => setSheetOpen(false)}
      />
    </Sheet>
  );
};

export default SalesTableDropdownMenu;
