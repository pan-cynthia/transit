import RouteCard from './RouteCard';

const NearbyRoutes = ({ nearbyStops }) => {
  return (
    <div className="w-2/5 overflow-y-scroll p-5">
      {Object.keys(nearbyStops).length > 0 ? (
        <>
          {nearbyStops.map((stop) => {
            return (
              <RouteCard
                key={stop.stop_id}
                stop={stop}
                isClickDisabled={false}
              />
            );
          })}
        </>
      ) : (
        <div>No Nearby Stops</div>
      )}
    </div>
  );
};

export default NearbyRoutes;
