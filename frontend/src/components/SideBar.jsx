import RouteCard from './RouteCard';

const SideBar = ({ nearbyStops }) => {
  return (
    <div className="w-1/3 bg-amber-100 p-5 overflow-y-scroll">
      <h1 className="text-2xl font-bold mb-5">Nearby Routes</h1>
      {nearbyStops.map((stop) => {
        return <RouteCard key={stop.id} name={stop.Name} />;
      })}
    </div>
  );
};

export default SideBar;
