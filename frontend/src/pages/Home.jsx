import { useEffect, useState } from 'react';
import api from '../api/axios';
import SideBar from '../components/SideBar';

const Home = () => {
  const [_, setUserLocation] = useState(null);
  const [nearbyStops, setNearbyStops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getStops();
        getUserLocation();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getStops = async () => {
    try {
      await api.get('/stops');
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="w-2/3 m-5">Map</div>
    </div>
  );
};

export default Home;
