import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import DropDown from '../components/DropDown';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import RouteCard from '../components/RouteCard';
import SideBar from '../components/SideBar';

const Search = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [directions, setDirections] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const routeId = searchParams.get('route');
    const directionId = searchParams.get('direction');
    const stopId = searchParams.get('stop');

    if (!routeId || !directionId || !stopId) {
      // no query params
      setIsLoading(false);
      return;
    }

    // only have ids, need full objects
    const routeObj = routes.find((r) => r.route_id === routeId);
    if (routeObj) setSelectedRoute(routeObj);

    const directionObj = directions.find(
      (d) => String(d.direction_id) === directionId
    );
    if (directionObj) setSelectedDirection(directionObj);

    const stopObj = stops.find((s) => String(s.stop_id) === stopId);
    if (stopObj) setSelectedStop(stopObj);

    if (routeObj && directionObj && stopObj) {
      setDisplayResults(true);
      setIsLoading(false);
    }
  }, [searchParams, routes, directions, stops]);

  const getPrediction = async () => {
    if (!selectedRoute || !selectedDirection || !selectedStop) return;

    setSearchParams({
      route: selectedRoute.route_id,
      direction: selectedDirection.direction_id,
      stop: selectedStop.stop_id,
    });

    setDisplayResults(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  const handleSearchClick = () => {
    setSearchParams({});
    setDisplayResults(false);
    setSelectedRoute(routes[0] || null);
    setSelectedDirection(directions[0] || null);
    setSelectedStop(stops[0] || null);
  };

  return (
    <>
      <SideBar
        isOpen={isSideBarOpen}
        toggle={() => setIsSideBarOpen(!isSideBarOpen)}
        onSearchClick={handleSearchClick}
      />
      <div className={`${isSideBarOpen ? 'ml-64' : 'ml-16'}`}>
        <NavBar />
        {displayResults ? (
          <>
            <RouteCard
              key={selectedStop.stop_id}
              stop={selectedStop}
              route={selectedRoute}
            />
          </>
        ) : (
          <>
            <div className="mx-auto flex h-[calc(100vh-64px)] w-[80%] flex-col justify-center">
              <div className="flex h-[80vh] flex-col items-center rounded-xl border-2 border-amber-200 bg-amber-100">
                <h2 className="mt-7 p-5 text-xl font-medium">
                  Find Stop by Route
                </h2>
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
                    getOptionValue={(direction) =>
                      String(direction.direction_id)
                    }
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
          </>
        )}
      </div>
    </>
  );
};

export default Search;
