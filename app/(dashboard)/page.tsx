import RevenueChartCard from "@/app/(dashboard)/_components/revenue-chart-card";
import TodayRevenueCard from "@/app/(dashboard)/_components/today-revenue-card";
import TotalProductsCard from "@/app/(dashboard)/_components/total-products-card";
import TotalRevenueCard from "@/app/(dashboard)/_components/total-revenue-card";
import TotalSalesCard from "@/app/(dashboard)/_components/total-sales-card";
import TotalStockCard from "@/app/(dashboard)/_components/total-stock-card";
import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "@/app/_components/header";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Suspense } from "react";

const DashboardContent = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<Skeleton className="bg-white" />}>
          <TotalRevenueCard />
        </Suspense>
        <Suspense fallback={<Skeleton className="bg-white" />}>
          <TodayRevenueCard />
        </Suspense>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<Skeleton className="bg-white" />}>
          <TotalSalesCard />
        </Suspense>
        <Suspense fallback={<Skeleton className="bg-white" />}>
          <TotalStockCard />
        </Suspense>
        <Suspense fallback={<Skeleton className="bg-white" />}>
          <TotalProductsCard />
        </Suspense>
      </div>
      <Suspense fallback={<Skeleton className="bg-white" />}>
        <RevenueChartCard />
      </Suspense>
    </>
  );
};
const Home = () => {
  return (
    <div className="ml-8 mr-8 mt-8 flex w-full flex-col space-y-8 rounded p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral</HeaderSubtitle>
          <HeaderTitle>Dashboards</HeaderTitle>
        </HeaderLeft>
      </Header>

      <Suspense fallback={<div>Carregando...</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  );
};

export default Home;
