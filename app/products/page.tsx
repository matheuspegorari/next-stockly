import { DataTable } from "../_components/ui/data-table";
import { cachedGetProducts, cachedGetRandomNumber } from "../_data-access/product/get-products";
import AddProductButton from "./_components/add-product-button";
import { productTableColumns } from "./_components/table-columns";

const Products = async () => {
  const randomNumber = await cachedGetRandomNumber();
  const products = await cachedGetProducts();
  return (
    <div className="ml-8 mr-8 mt-8 w-full space-y-8 rounded bg-white p-8 shadow-md">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Produtos
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>
        <AddProductButton />
        {randomNumber}
      </div>
      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default Products;
