import ProductStatusBadge from "@/app/_components/product-status-badge";
import { MostSoldProductsDto } from "@/app/_data-access/dashboard/get-dashboard";
import { formatCurrency } from "@/app/_helpers/currency";

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
        <p className="text-sm font-semibold text-right">{product.totalSold} vendas</p>
      </div>
    </div>
  );
};

export default MostSoldProductItem;
