import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "@/app/(dashboard)/_components/summary-card";
import { getTotalStock } from "@/app/_data-access/dashboard/get-total-stock";
import { Package } from "lucide-react";

const TotalStockCard = async () => {
  const totalStock = await getTotalStock();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <Package />
      </SummaryCardIcon>
      <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
      <SummaryCardValue>{totalStock}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalStockCard;
