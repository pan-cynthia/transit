import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import DropDown from '../components/DropDown';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const Search = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [directions, setDirections] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // get all routes
    const getRoutes = async () => {
      try {
        const response = await api.get('/routes');
        setRoutes(response.data);
        setSelectedRoute(response.data[0]); // set default route
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
        const response = await api.get(`/trips/${selectedRoute.route_id}`);
        setDirections(response.data);
        setSelectedDirection(response.data[0]); // set default direction
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
          `/stops/${selectedRoute.route_id}/${selectedDirection.direction_id}`
        );
        setStops(response.data);
        setSelectedStop(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getStops();
  }, [selectedRoute, selectedDirection]);

  const getPrediction = async () => {
    if (!selectedRoute || !selectedDirection || !selectedStop) return;

    navigate(
      `/route/${selectedRoute.route_id}/${selectedDirection.direction_id}/${selectedStop.stop_id}`,
      {
        state: {
          stop: selectedStop,
        },
      }
    );
  };

  return (
    <>
      <SideBar
        isOpen={isSideBarOpen}
        toggle={() => setIsSideBarOpen(!isSideBarOpen)}
      />
      <div className={`${isSideBarOpen ? 'ml-64' : 'ml-16'}`}>
        <NavBar />
        <div className="flex h-[calc(100vh-64px)] items-center justify-center">
          <div className="flex h-[80vh] w-full max-w-xl flex-col items-center rounded-xl bg-white shadow-sm">
            <h2 className="mt-15 mb-7 text-xl font-medium">
              Find Stop by Route
            </h2>
            <div className="mt-5 w-full divide-y divide-gray-200 px-10">
              <div className="mb-5 flex flex-col">
                <label className="mb-2 font-medium">Route</label>
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
              <div className="mb-5 flex flex-col">
                <label className="mb-2 font-medium">Direction</label>
                <DropDown
                  options={directions}
                  value={selectedDirection}
                  onChange={setSelectedDirection}
                  getOptionKey={(direction) => direction.direction_id}
                  getOptionValue={(direction) => String(direction.direction_id)}
                  getOptionLabel={(direction) => direction.trip_headsign}
                />
              </div>
              <div className="mb-5 flex flex-col">
                <label className="mb-2 font-medium">Stop</label>
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
                className="mt-7 w-full cursor-pointer rounded-xl bg-amber-200 p-3 font-medium hover:bg-amber-300"
                onClick={getPrediction}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
