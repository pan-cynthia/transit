import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import Map from '../components/Map';
import SideBar from '../components/SideBar';

const Nearby = () => {
  const [nearbyStops, setNearbyStops] = useState([]);
  const location = useLocation();
  const { latitude, longitude } = location.state;

  useEffect(() => {
    const getNearbyStops = async () => {
      console.log(latitude, longitude);
      try {
        const response = await api.get('/nearby', {
          params: {
            latitude,
            longitude,
          },
        });
        setNearbyStops(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getNearbyStops();
  }, [latitude, longitude]);

  return (
    <div className="flex h-screen">
      <SideBar nearbyStops={nearbyStops} />
      <div className="m-5 w-3/5">
        <Map latitude={latitude} longitude={longitude}></Map>
      </div>
    </div>
  );
};

export default Nearby;
