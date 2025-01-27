"use client";
import { createSale } from "@/app/_actions/sales/create-sale";
import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { formatCurrency } from "@/app/_helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LoaderCircle, PlusIcon } from "lucide-react";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import UpsertSalesTableDropdownMenu from "./upsert-table-dropdown";

const formSchema = z.object({
  productId: z.string().uuid({ message: "Produto é obrigatório" }),
  quantity: z.coerce.number().int().positive(),
});
type FormSchema = z.infer<typeof formSchema>;

interface UpsertSalesSheetContentProps {
  products: ProductDto[];
  productOptions: ComboboxOption[];
  onSubmitSuccess: () => void;
}

type SelectedProducts = ProductDto & {
  quantity: number;
};

const isQuantityExceedStock = (
  desiredQuantity: number,
  availableStock: number,
) => {
  return desiredQuantity > availableStock;
};

const UpsertSalesSheetContent = ({
  products,
  productOptions,
  onSubmitSuccess,
}: UpsertSalesSheetContentProps) => {
  const toastIdRef = useRef<string | number | null>(null);
  const { execute: executeCreateSale } = useAction(createSale, {    
    onExecute: () => {
      setIsCreatingSale(true);
      toastIdRef.current = toast.loading("Processando venda...", {
        dismissible: false,
      });
    },
    onSuccess: () => {
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
      setIsCreatingSale(false);
      setSelectedProducts([]);
      toast.success("Venda realizada com sucesso!");
      onSubmitSuccess();
    },
    onError: ({ error: { validationErrors, serverError } }) => {
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
      const flattenedErrors = flattenValidationErrors(validationErrors);
      toast.error(serverError ?? flattenedErrors.formErrors[0]);
    },
  });

  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>(
    [],
  );
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;
    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existingProduct) {
        const newQuantity = existingProduct.quantity + data.quantity;
        if (isQuantityExceedStock(newQuantity, selectedProduct.stock)) {
          form.setError("quantity", {
            message: "Quantidade indisponível em estoque.",
          });
          return currentProducts;
        }
        form.reset();
        return currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }
      if (isQuantityExceedStock(data.quantity, selectedProduct.stock)) {
        form.setError("quantity", {
          message: "Quantidade indisponível em estoque.",
        });
        return currentProducts;
      }
      form.reset();
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const [isCreatingSale, setIsCreatingSale] = useState(false);

  const productsTotal = useMemo(() => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  }, [selectedProducts]);

  const onDelete = (productId: string) => {
    setSelectedProducts((current) =>
      current.filter((product) => product.id !== productId),
    );
  };

  const onSubmitSale = async () => {
    if (isCreatingSale) return;

    await executeCreateSale({
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    options={productOptions}
                    placeholder="Selecione o(s) produto(s)"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Digite a quantidade"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full gap-2" variant="secondary">
            <PlusIcon />
            Adicionar produto à venda
          </Button>
        </form>
      </Form>
      <Table>
        <TableCaption>Lista de produtos adicionados à venda</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Vlr. Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <UpsertSalesTableDropdownMenu
                  product={product}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <SheetFooter className="pt-6">
        <Button
          className="w-full gap-2"
          disabled={selectedProducts.length === 0 || isCreatingSale} // Disable button if there are no products or if it's creating a sale
          onClick={onSubmitSale}
        >
          {isCreatingSale ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Check />
          )}
          {isCreatingSale ? "Realizando venda..." : "Finalizar venda"}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSalesSheetContent;
