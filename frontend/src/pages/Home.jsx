import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser.');
      navigate('/search');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        navigate('/nearby', { state: { latitude, longitude } });
      },
      (error) => {
        console.log('Error getting user location', error);
        navigate('/search');
      }
    );
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loading />
    </div>
  );
};

export default Home;
