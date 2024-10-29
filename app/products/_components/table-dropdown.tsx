import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { ProductDto } from "@/app/_data-access/product/get-products";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DeleteProductDialogContent from "./delete-dialog-content";
import UpsertProductDialogContent from "./upsert-dialog-content";

interface ProductTableDropdownMenuProps {
  product: ProductDto;
}

const ProductTableDropdownMenu = ({
  product,
}: ProductTableDropdownMenuProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <AlertDialog>
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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
                  navigator.clipboard.writeText(product.id);
                  toast.success("ID copiado para a área de transferência.");
                }}
              >
                <ClipboardCopyIcon />
                Copiar ID
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem className="gap-1.5">
                  <EditIcon />
                  Editar
                </DropdownMenuItem>
              </DialogTrigger>
              <AlertDialogTrigger>
                <DropdownMenuItem className="gap-1.5">
                  <TrashIcon />
                  Deletar
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <UpsertProductDialogContent
            onSuccessfulSubmit={() => setEditDialogOpen(false)}
            defaultValues={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              stock: product.stock,
            }}
          />
          <DeleteProductDialogContent productId={product.id} />
        </Dialog>
      </AlertDialog>
    </>
  );
};

export default ProductTableDropdownMenu;
