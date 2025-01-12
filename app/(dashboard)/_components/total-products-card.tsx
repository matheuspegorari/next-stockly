import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "@/app/(dashboard)/_components/summary-card";
import { getTotalProducts } from "@/app/_data-access/dashboard/get-total-products";
import { ShoppingBasket } from "lucide-react";

const TotalProductsCard = async () => {
  const totalProducts = await getTotalProducts();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <ShoppingBasket />
      </SummaryCardIcon>
      <SummaryCardTitle>Produtos</SummaryCardTitle>
      <SummaryCardValue>{totalProducts}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalProductsCard;
