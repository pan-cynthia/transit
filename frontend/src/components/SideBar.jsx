import RouteCard from './RouteCard';

const SideBar = ({ nearbyStops }) => {
  return (
    <div className="w-2/5 bg-amber-100 p-5 overflow-y-scroll">
      <h1 className="text-2xl font-bold mb-5">Nearby Routes</h1>
      {nearbyStops.map((stop) => {
        return <RouteCard key={stop.id} stop={stop} />;
      })}
    </div>
  );
};

export default SideBar;
