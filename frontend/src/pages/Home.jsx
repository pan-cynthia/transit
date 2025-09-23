import { useEffect, useState } from 'react';
import api from '../api/axios';
import Map from '../components/Map';
import SideBar from '../components/SideBar';

const Home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStops, setNearbyStops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getUserLocation();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser.');
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
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
    });
  };

  return (
    <div className="flex h-screen">
      <SideBar nearbyStops={nearbyStops} />
      <div className="w-3/5 m-5">
        <Map userLocation={userLocation}></Map>
      </div>
    </div>
  );
};

export default Home;
