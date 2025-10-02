import { useEffect, useState } from 'react';
import api from '../api/axios';
import DropDown from '../components/DropDown';

const Search = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [directions, setDirections] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState('');
  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState('');

  useEffect(() => {
    // get all routes
    const getRoutes = async () => {
      try {
        const response = await api.get('/routes');
        setRoutes(response.data);
        setSelectedRoute(response.data[0].route_id); // set default route
      } catch (error) {
        console.error(error);
      }
    };
    getRoutes();
  }, []);

  useEffect(() => {
    if (!selectedRoute) return;
    // get all directions for selected route
    const getDirections = async () => {
      try {
        const response = await api.get(`/trips/${selectedRoute}`);
        setDirections(response.data);
        /*
         direction can either be 0 or 1 (outbound or inbound)
         if direction is 0, then !selectedDirection will result in true and return
         and the default stop doesn't get set until user selects something
         need to typecast direction to string to avoid this
         */
        setSelectedDirection(String(response.data[0].direction_id)); // set default direction
      } catch (error) {
        console.error(error);
      }
    };

    getDirections();
  }, [selectedRoute]);

  useEffect(() => {
    if (!selectedRoute || !selectedDirection) return;
    // get all stops for selected route and direction
    const getStops = async () => {
      try {
        const response = await api.get(
          `/stops/${selectedRoute}/${selectedDirection}`
        );
        setStops(response.data);
        setSelectedStop(response.data[0].stop_id);
      } catch (error) {
        console.error(error);
      }
    };

    getStops();
  }, [selectedRoute, selectedDirection]);

  const getPrediction = async () => {
    // call 511 API for current prediction
    const response = await api.get(`/stop/${selectedStop}`);
    console.log(response.data);
  };

  return (
    <div className="mx-auto flex h-screen w-3/5 flex-col justify-center">
      <div className="flex h-[80vh] flex-col items-center rounded-xl border-2 border-slate-600 bg-amber-100">
        <h2 className="mt-7 p-5 text-xl font-medium">Find Stop by Route</h2>
        <div className="mt-7 flex w-3/4 justify-between rounded-xl bg-amber-200 p-5">
          <label className="font-medium">Route</label>
          <DropDown
            options={routes}
            value={selectedRoute}
            onChange={setSelectedRoute}
            getOptionKey={(route) => route.route_id}
            getOptionValue={(route) => route.route_id}
            getOptionLabel={(route) =>
              `${route.route_short_name} ${route.route_long_name}`
            }
          />
        </div>
        <div className="mt-7 flex w-3/4 justify-between rounded-xl bg-amber-200 p-5">
          <label className="font-medium">Direction</label>
          <DropDown
            options={directions}
            value={selectedDirection}
            onChange={setSelectedDirection}
            getOptionKey={(direction) => direction.direction_id}
            getOptionValue={(direction) => direction.direction_id}
            getOptionLabel={(direction) => direction.trip_headsign}
          />
        </div>
        <div className="mt-7 flex w-3/4 justify-between rounded-xl bg-amber-200 p-5">
          <label className="font-medium">Stop</label>
          <DropDown
            options={stops}
            value={selectedStop}
            onChange={setSelectedStop}
            getOptionKey={(stop) => stop.stop_id}
            getOptionValue={(stop) => stop.stop_id}
            getOptionLabel={(stop) => stop.stop_name}
          />
        </div>
        <button
          className="mt-7 w-25 cursor-pointer rounded-xl bg-amber-200 p-5 font-medium"
          onClick={getPrediction}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
