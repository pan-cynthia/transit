import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import Map from '../components/Map';
import SideBar from '../components/SideBar';

const Nearby = () => {
  const [nearbyStops, setNearbyStops] = useState([]);
  const location = useLocation();
  const { latitude, longitude } = location.state;
  const [pinLocation, setPinLocation] = useState({
    latitude: latitude,
    longitude: longitude,
  });

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
      {nearbyStops && (
        <div className="flex h-screen">
          <SideBar nearbyStops={nearbyStops} />
          <div className="m-5 w-3/5">
            <Map
              latitude={pinLocation.latitude}
              longitude={pinLocation.longitude}
              onChange={setPinLocation}
            ></Map>
          </div>
        </div>
      )}
    </>
  );
};

export default Nearby;
