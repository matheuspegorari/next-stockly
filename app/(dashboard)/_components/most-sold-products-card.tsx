import MostSoldProductItem from "@/app/(dashboard)/_components/most-sold-products";
import { getMostSoldProducts } from "@/app/_data-access/dashboard/get-most-sold-products";

const MostSoldProductsCard = async () => {
  const mostSoldProducts = await getMostSoldProducts();
  return (
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
  );
};

export default MostSoldProductsCard;
