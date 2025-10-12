import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { LocationContext } from '../contexts/LocationContext';

const Home = () => {
  const navigate = useNavigate();

  const { location, permissionStatus, getLocation } =
    useContext(LocationContext);

  useEffect(() => {
    if (permissionStatus == 'denied') {
      navigate('/search');
    } else if (permissionStatus == 'granted' && location) {
      navigate('/nearby');
    } else {
      getLocation();
    }
  }, [navigate, permissionStatus, getLocation, location]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loading />
    </div>
  );
};

export default Home;
