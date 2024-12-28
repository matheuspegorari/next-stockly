import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "@/app/_components/header";

const Home = () => {
  return (
    <div className="ml-8 mr-8 mt-8 w-full space-y-8 rounded bg-white p-8 shadow-md">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral</HeaderSubtitle>
          <HeaderTitle>Dashboards</HeaderTitle>
        </HeaderLeft>
      </Header>
    </div>
  );
};
export default Home;
