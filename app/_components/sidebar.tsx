import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <>
      <div className="w-64 bg-white p-8">
        {/* Imagem */}
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold">STOCKLY</h1>
        </div>
        {/* Botões */}
        <div className="flex flex-col gap-2 p-2">
          <Button className="px-6 py-3">Dashboard</Button>
          <Button className="px-6 py-3">Produtos</Button>
          <Button className="px-6 py-3">Vendas</Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
