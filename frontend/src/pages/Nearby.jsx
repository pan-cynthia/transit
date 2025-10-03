import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import Map from '../components/Map';
import NavBar from '../components/NavBar';
import NearbyRoutes from '../components/NearbyRoutes';
import SideBar from '../components/SideBar';

const Nearby = () => {
  const [nearbyStops, setNearbyStops] = useState([]);
  const location = useLocation();
  const { latitude, longitude } = location.state || {};
  const [pinLocation, setPinLocation] = useState({
    latitude: latitude,
    longitude: longitude,
  });

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    const getNearbyStops = async () => {
      try {
        const response = await api.get('/nearby', {
          params: {
            latitude: pinLocation.latitude,
            longitude: pinLocation.longitude,
          },
        });
        setNearbyStops(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getNearbyStops();
  }, [pinLocation]);

  return (
    <>
      {pinLocation.latitude && pinLocation.longitude ? (
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
                  latitude={pinLocation.latitude}
                  longitude={pinLocation.longitude}
                  onChange={setPinLocation}
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
