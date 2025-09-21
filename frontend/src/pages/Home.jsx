import { useEffect, useState } from 'react';
import api from '../api/axios';
import SideBar from '../components/SideBar';

const Home = () => {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const getStops = async () => {
      try {
        const response = await api.get('/stops');
        setStops(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getStops();
  }, []);

  return (
    <div className="flex h-screen">
      <SideBar stops={stops} />
      <div className="w-2/3 m-5">Map</div>
    </div>
  );
};

export default Home;
