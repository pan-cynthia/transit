import RouteCard from './RouteCard';

const SideBar = () => {
  return (
    <div className="w-1/3 bg-amber-100 p-5">
      <h1 className="text-2xl font-bold mb-5">Nearby Routes</h1>
      <RouteCard />
      <RouteCard />
      <RouteCard />
    </div>
  );
};

export default SideBar;
