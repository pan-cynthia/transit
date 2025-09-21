import { useEffect, useState } from 'react';
import api from '../api/axios';
import SideBar from '../components/SideBar';

const Home = () => {
  const [_, setUserLocation] = useState(null);
  const [stops, setStops] = useState([]);

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
      const response = await api.get('/stops');
      setStops(response.data);
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
      console.log('User Location:', latitude, longitude);
      setUserLocation({ latitude, longitude });
    });
  };

  return (
    <div className="flex h-screen">
      <SideBar stops={stops} />
      <div className="w-2/3 m-5">Map</div>
    </div>
  );
};

export default Home;
