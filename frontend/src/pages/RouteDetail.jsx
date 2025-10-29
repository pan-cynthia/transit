import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePredictions } from '../../hooks/usePredictions';
import api from '../api/axios';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import RouteCard from '../components/RouteCard';
import RouteMap from '../components/RouteMap';
import SideBar from '../components/SideBar';
import Error from './Error';

const RouteDetail = () => {
  const { routeId, directionId, stopId } = useParams();
  const { state } = useLocation();

  const [stop, setStop] = useState(state?.stop);
  const [direction, setDirection] = useState(state?.direction);
  const [error, setError] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if stop is undefined, need to get stop object by calling /stops/:stopId endpoint
    const fetchStopData = async () => {
      try {
        const response = await api.get(`/stops/${routeId}/${directionId}`);
        const foundStop = response.data.find((s) => s.stop_id === stopId);
        if (!foundStop) {
          // stop doesn't get set if stopId is wrong
          setError(true);
        } else {
          setStop(foundStop);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!stop) {
      fetchStopData();
    }
  }, [stop, routeId, directionId, stopId]);

  useEffect(() => {
    const fetchDirectionData = async () => {
      try {
        const response = await api.get(`/directions/${routeId}`);
        const foundDirection = response.data.find(
          (d) => Number(d.direction_id) === Number(directionId)
        );
        if (!foundDirection) {
          setError(true);
        } else {
          setDirection(foundDirection);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!direction) {
      fetchDirectionData();
    }
  }, [routeId, direction, directionId]);

  const { predictions, isLoading } = usePredictions(stop, routeId);

  const vehicleLocations = predictions[routeId]
    ? predictions[routeId]
        .map((p) => p.vehicleLocation)
        .filter((v) => v && v.Latitude && v.Longitude)
        .map((v) => ({
          latitude: parseFloat(v.Latitude),
          longitude: parseFloat(v.Longitude),
        }))
    : [];

  // redirect to search page on error after 5 seconds
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => navigate('/search'), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error, navigate]);

  if (error) {
    return <Error />;
  }

  if (isLoading || !stop || !direction) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <SideBar
        isOpen={isSideBarOpen}
        toggle={() => setIsSideBarOpen(!isSideBarOpen)}
      />
      <div
        className={`w-full overflow-hidden ${isSideBarOpen ? 'ml-64' : 'ml-16'}`}
      >
        <NavBar />
        <>
          <RouteCard
            key={stopId}
            stop={stop}
            routeId={routeId}
            isClickDisabled={true}
          />
          <RouteMap
            stop={stop}
            direction={direction}
            vehicleLocations={vehicleLocations}
          />
        </>
      </div>
    </div>
  );
};

export default RouteDetail;
