import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ClipboardCopyIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import { toast } from "sonner";

interface SalesTableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

const SalesTableDropdownMenu = ({
  product,
  onDelete,
}: SalesTableDropdownMenuProps) => {
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
            onClick={() => {
              navigator.clipboard.writeText(product.id);
              toast.success("ID copiado para a área de transferência.");
            }}
          >
            <ClipboardCopyIcon />
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-1.5" onClick={() => onDelete(product.id)}>
            <TrashIcon />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SalesTableDropdownMenu;
