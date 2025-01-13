import MostSoldProductsCard from "@/app/(dashboard)/_components/most-sold-products-card";
import RevenueChart from "@/app/(dashboard)/_components/revenue-chart";
import { getChartRevenue } from "@/app/_data-access/dashboard/get-chart-revenue";

const RevenueChartCard = async () => {
  const totalLast14DaysRevenue = await getChartRevenue();
  return (
    <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
        <p className="text-lg font-semibold text-slate-900">Receita</p>
        <p className="text-sm text-slate-400">Últimos 14 dias</p>
        <RevenueChart data={totalLast14DaysRevenue.reverse()} />
      </div>
      <MostSoldProductsCard />
    </div>
  );
};

export default RevenueChartCard;