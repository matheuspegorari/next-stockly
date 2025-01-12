import MostSoldProductItem from "@/app/(dashboard)/_components/most-sold-products";
import RevenueChart from "@/app/(dashboard)/_components/revenue-chart";
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
import { getDashboard } from "@/app/_data-access/dashboard/get-dashboard";
import { Suspense } from "react";

const DashboardContent = async () => {
  const { totalLast14DaysRevenue, mostSoldProducts } = await getDashboard();

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

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
          <p className="text-lg font-semibold text-slate-900">Receita</p>
          <p className="text-sm text-slate-400">Últimos 14 dias</p>
          <RevenueChart data={totalLast14DaysRevenue.reverse()} />
        </div>
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
          <p className="py-6 text-lg font-semibold text-slate-900">
            Produtos mais vendidos
          </p>
          <div className="space-y-7 overflow-y-auto px-6">
            {mostSoldProducts.map((product) => (
              <MostSoldProductItem key={product.productId} product={product} />
            ))}
          </div>
        </div>
      </div>
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
