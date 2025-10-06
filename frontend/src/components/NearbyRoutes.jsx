import RouteCard from './RouteCard';

const NearbyRoutes = ({ nearbyStops }) => {
  return (
    <div className="w-2/5 overflow-y-scroll p-5">
      {nearbyStops.map((stop) => {
        return <RouteCard key={stop.stop_id} stop={stop} />;
      })}
    </div>
  );
};

export default NearbyRoutes;
