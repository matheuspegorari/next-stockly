import { Badge } from "@/app/_components/ui/badge";
import { ProductStatusDto } from "@/app/_data-access/product/get-products";

interface ProductStatusBadgeProps {
  status: ProductStatusDto;
}

const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const label = getStatusLabel(status);
  return (
    <Badge
      variant={status === "IN_STOCK" ? "default" : "destructive"}
      className="gap-2"
    >
      {label}
    </Badge>
  );
};

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Esgotado";
};

export default ProductStatusBadge;
