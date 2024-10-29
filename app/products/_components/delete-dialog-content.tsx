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
import { toast } from "sonner";

interface DeleteProductDialogContentProps {
  productId: string;
}

const DeleteProductDialogContent = ({productId}:DeleteProductDialogContentProps) => {
    const handleContinueClick = async () => {
    // Delete product
    try {
        await deleteProduct({ id: productId });
        toast.success("Produto deletado com sucesso!");
    } catch (error) {
        console.error(error);
        toast.error(`Ocorreu um erro ao deletar o produto. ${error}`);
    }
  };

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
        <AlertDialogAction onClick={handleContinueClick}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialogContent;
