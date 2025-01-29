import RevenueChartCard from "@/app/(dashboard)/_components/revenue-chart-card";
import { SummaryCardSkeleton } from "@/app/(dashboard)/_components/summary-card";
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
import { Metadata } from "next";
import { Suspense } from "react";

const DashboardContent = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCard />
        </Suspense>
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TodayRevenueCard />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalSalesCard />
        </Suspense>
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalStockCard />
        </Suspense>
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalProductsCard />
        </Suspense>
      </div>
      <Suspense fallback={<SummaryCardSkeleton />}>
        <RevenueChartCard />
      </Suspense>
    </>
  );
};
const Home = () => {
  return (
    <div className="ml-8 mr-8 mt-8 flex w-full flex-col space-y-8 rounded p-8 overflow-auto">
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

export const metadata: Metadata = {
  title: "Dashboard | Stockly",
}; 

export default Home;
