"use client";
import { upsertProduct } from "@/app/_actions/products/upsert-product";
import {
  UpsertProductSchemaType,
  upsertProductSchema,
} from "@/app/_actions/products/upsert-product/schema";
import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

interface UpsertProductDialogContentProps {
  defaultValues?: UpsertProductSchemaType;
  onSuccessfulSubmit?: () => void;
}

const UpsertProductDialogContent = ({
  defaultValues,
  onSuccessfulSubmit,
}: UpsertProductDialogContentProps) => {
      const toastIdRef = useRef<string | number | null>(null);
  
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const isEditint = !!defaultValues;
  const { execute: executeUpsertProduct } = useAction(upsertProduct, {
    onExecute: () => {
      toastIdRef.current = toast.loading("Processando venda...", {
        dismissible: false,
      });
      toast.loading(`${isEditint ? "Editando " : "Criando"} produto...`);
      setIsCreatingProduct(true);
    },
    onSuccess: () => {
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
      toast.success(`Produto ${isEditint ? "editado " : "criado"} com sucesso`);
      onSuccessfulSubmit?.();
      setIsCreatingProduct(false);
    },
    onError: () => {
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
      toast.error("Erro ao salvar o produto");
      setIsCreatingProduct(false);
    },
    
  });

  const form = useForm<UpsertProductSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: defaultValues ?? { name: "", price: 0, stock: 1 },
  });

  const onSubmit = async (data: UpsertProductSchemaType) => {
    executeUpsertProduct({ ...data, id: defaultValues?.id });
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>{isEditint ? "Editar" : "Novo"} produto</DialogTitle>
            <DialogDescription>Insira as informações abaixo</DialogDescription>
          </DialogHeader>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto:</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço (R$):</FormLabel>
                <FormControl>
                  <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(values) => {
                      field.onChange(values.floatValue);
                    }}
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite o estoque do produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" type="reset">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isCreatingProduct}>
              {form.formState.isSubmitting ||
                (isCreatingProduct && (
                  <Loader2Icon className="animate-spin" size={18} />
                ))}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertProductDialogContent;
