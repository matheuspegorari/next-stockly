import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "@/app/_components/header";
import { Metadata } from "next";
import { DataTable } from "../_components/ui/data-table";
import { cachedGetProducts } from "../_data-access/product/get-products";
import AddProductButton from "./_components/add-product-button";
import { productTableColumns } from "./_components/table-columns";

const Products = async () => {
  const products = await cachedGetProducts();
  return (
    <div className="mt-8 w-full space-y-8 rounded bg-white p-8 shadow-md overflow-auto">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Produtos</HeaderSubtitle>
          <HeaderTitle>Produtos</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <AddProductButton />
        </HeaderRight>
      </Header>
      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Produtos | Stockly",
}; 

export default Products;
