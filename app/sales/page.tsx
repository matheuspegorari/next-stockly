import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "@/app/_components/header";
import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { cachedGetProducts } from "../_data-access/product/get-products";
import { getSales } from "../_data-access/sales/get-sales";
import CreateSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";

const SalesPage = async () => {
  const sales = await getSales();
  const products = await cachedGetProducts();
  const productOptions: ComboboxOption[] = products.map(
    (product: { id: string; name: string }) => ({
      value: product.id,
      label: product.name,
    }),
  );

  return (
    <div className="ml-8 mr-8 mt-8 w-full space-y-8 rounded bg-white p-8 shadow-md overflow-auto">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Vendas</HeaderSubtitle>
          <HeaderTitle>Vendas</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateSaleButton
            products={products}
            productOptions={productOptions}
          />
        </HeaderRight>
      </Header>
      <DataTable columns={saleTableColumns} data={sales} />
    </div>
  );
};

export default SalesPage;
