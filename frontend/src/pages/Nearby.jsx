import { useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import Map from '../components/Map';
import NavBar from '../components/NavBar';
import NearbyRoutes from '../components/NearbyRoutes';
import SideBar from '../components/SideBar';
import { LocationContext } from '../contexts/LocationContext';

const Nearby = () => {
  const { location, setLocation } = useContext(LocationContext);

  const [nearbyStops, setNearbyStops] = useState([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    if (!location) return;

    const getNearbyStops = async () => {
      try {
        const response = await api.get('/nearby', {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        });
        setNearbyStops(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getNearbyStops();
  }, [location]);

  return (
    <>
      {location ? (
        <div className="flex h-screen">
          <SideBar
            isOpen={isSideBarOpen}
            toggle={() => setIsSideBarOpen(!isSideBarOpen)}
          />
          <div className={`w-full ${isSideBarOpen ? 'ml-64' : 'ml-16'}`}>
            <NavBar />
            <div className="flex h-[calc(100vh-64px)] flex-1 overflow-hidden">
              <NearbyRoutes nearbyStops={nearbyStops} />
              <div className="w-3/5 bg-white p-5">
                <Map
                  latitude={location.latitude}
                  longitude={location.longitude}
                  onChange={setLocation}
                  stops={nearbyStops}
                ></Map>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen">
          <SideBar
            isOpen={isSideBarOpen}
            toggle={() => setIsSideBarOpen(!isSideBarOpen)}
          />
          <div className={`w-full ${isSideBarOpen ? 'ml-64' : 'ml-16'}`}>
            <NavBar />
            <h1 className="flex h-[calc(100vh-64px)] items-center justify-center text-lg">
              Enable location for this site to view nearby departures
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Nearby;
