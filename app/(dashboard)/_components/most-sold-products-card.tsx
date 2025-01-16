import MostSoldProductItem from "@/app/(dashboard)/_components/most-sold-products";
import { getMostSoldProducts } from "@/app/_data-access/dashboard/get-most-sold-products";

const MostSoldProductsCard = async () => {
  const mostSoldProducts = await getMostSoldProducts();
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
      <p className="text-lg font-semibold text-slate-900">
        Produtos mais vendidos
      </p>
      <p className="pb-6 text-sm text-slate-400">Todo o tempo</p>
      <div className="space-y-7 overflow-y-auto px-6">
        {mostSoldProducts.map((product) => (
          <MostSoldProductItem key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MostSoldProductsCard;
