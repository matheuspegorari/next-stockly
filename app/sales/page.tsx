import { Button } from "../_components/ui/button";
import { ComboboxOption } from "../_components/ui/combobox";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { getProducts } from "../_data-access/product/get-products";
import UpsertSalesSheetContent from "./_components/upsert-sheet-content";

const SalesPage = async () => {
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map(
    (product: { id: any; name: any }) => ({
      value: product.id,
      label: product.name,
    }),
  );

  return (
    <div className="ml-8 mr-8 mt-8 w-full space-y-8 rounded bg-white p-8 shadow-md">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Vendas
          </span>
          <h2 className="text-xl font-semibold">Vendas</h2>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Nova Venda</Button>
          </SheetTrigger>
          <UpsertSalesSheetContent products={products} productOptions={productOptions} />
        </Sheet>
      </div>
      {/* <DataTable
            columns={productTableColumns}
            data={JSON.parse(JSON.stringify(products))}
          /> */}
    </div>
  );
};

export default SalesPage;
