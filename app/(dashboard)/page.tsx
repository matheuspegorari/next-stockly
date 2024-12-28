import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "@/app/(dashboard)/_components/summary-card";
import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "@/app/_components/header";
import { getDashboard } from "@/app/_data-access/dashboard/get-dashboard";
import { formatCurrency } from "@/app/_helpers/currency";
import { CircleDollarSign, DollarSign, Package, ShoppingBasket } from "lucide-react";

const Home = async () => {
  const { totalRevenue, todayRevenue, totalSales, totalStock, totalProducts } = await getDashboard();
  return (
    <div className="ml-8 mr-8 mt-8 w-full space-y-8 rounded p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral</HeaderSubtitle>
          <HeaderTitle>Dashboards</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <DollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>Receita Total</SummaryCardTitle>
          <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
            <SummaryCardIcon>
              <DollarSign />
            </SummaryCardIcon>
            <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
            <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
          </SummaryCard>
      </div>

      <div className="grid grid-cols-3 gap-6">
          <SummaryCard>
            <SummaryCardIcon>
              <CircleDollarSign />
            </SummaryCardIcon>
            <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
            <SummaryCardValue>{totalSales}</SummaryCardValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryCardIcon>
              <Package />
            </SummaryCardIcon>
            <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
            <SummaryCardValue>{totalStock}</SummaryCardValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryCardIcon>
              <ShoppingBasket />
            </SummaryCardIcon>
            <SummaryCardTitle>Produtos</SummaryCardTitle>
            <SummaryCardValue>{totalProducts}</SummaryCardValue>
          </SummaryCard>
        </div>
    </div>
  );
};
export default Home;
