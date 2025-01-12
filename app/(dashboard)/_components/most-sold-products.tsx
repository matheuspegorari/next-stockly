import ProductStatusBadge from "@/app/_components/product-status-badge";
import { ProductStatusDto } from "@/app/_data-access/product/get-products";
import { formatCurrency } from "@/app/_helpers/currency";

export interface MostSoldProductsDto {
  productId: string;
  name: string;
  totalSold: number;
  price: number;
  status: ProductStatusDto;
}
interface MostSoldProductProps {
  product: MostSoldProductsDto;
}

const MostSoldProductItem = ({ product }: MostSoldProductProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-[6px]">
        <ProductStatusBadge status={product.status} />
        <p className="font-semibold">{product.name}</p>
        <p className="font-medium text-slate-500">
          {formatCurrency(product.price)}
        </p>
      </div>
      <div>
        <p className="text-right text-sm font-semibold">
          {product.totalSold} vendas
        </p>
      </div>
    </div>
  );
};

export default MostSoldProductItem;
