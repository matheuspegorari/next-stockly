import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./ui/sidebar-button";
const Sidebar = () => {
  return (
    <>
      <div className="w-64 bg-white shadow-sm">
        {/* Imagem */}
        <div className="px-2 py-6">
          <h1 className="text-2xl font-extrabold">STOCKLY</h1>
        </div>
        {/* Botões */}
        <div className="flex flex-col gap-2 p-2">
          <SidebarButton
            href="/"
            icon={<LayoutGridIcon size={20} />}
            text="Dashboard"
          />
          <SidebarButton
            href="/products"
            icon={<PackageIcon size={20} />}
            text="Produtos"
          />
          <SidebarButton
            href="/sales"
            icon={<ShoppingBasketIcon size={20} />}
            text="Vendas"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
