import RouteCard from './RouteCard';

const SideBar = ({ nearbyStops }) => {
  return (
    <div className="w-2/5 overflow-y-scroll bg-amber-100 p-5">
      <h1 className="mb-5 text-2xl font-bold">Nearby Routes</h1>
      {nearbyStops.map((stop) => {
        return <RouteCard key={stop.id} stop={stop} />;
      })}
    </div>
  );
};

export default SideBar;
