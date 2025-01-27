import { deleteProduct } from "@/app/_actions/products/delete-product";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { toast } from "sonner";

interface DeleteProductDialogContentProps {
  productId: string;
}

const DeleteProductDialogContent = ({
  productId,
}: DeleteProductDialogContentProps) => {
    const toastIdRef = useRef<string | number | null>(null);
  
  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onExecute: () => {
      toastIdRef.current = toast.loading("Processando venda...", {
        dismissible: false,
      });
    },
    onSuccess: () => {
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
      toast.success("Produto deletado com sucesso!");
    },
    onError: () => {
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
      toast.error("Erro ao deletar o produto!");
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a deletar este produto. Esta ação não pode ser
          desfeita.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          onClick={async () => executeDeleteProduct({ id: productId })}
        >
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialogContent;
