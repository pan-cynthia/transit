import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { usePredictions } from '../../hooks/usePredictions';
import api from '../api/axios';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import RouteCard from '../components/RouteCard';
import RouteMap from '../components/RouteMap';
import SideBar from '../components/SideBar';

const RouteDetail = () => {
  const { routeId, directionId, stopId } = useParams();
  const { state } = useLocation();

  const [stop, setStop] = useState(state?.stop);
  const [direction, setDirection] = useState(state?.direction);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    // if stop is undefined, need to get stop object by calling /stops/:stopId endpoint
    const fetchStopData = async () => {
      try {
        const response = await api.get(`/stops/${routeId}/${directionId}`);
        setStop(response.data.find((s) => s.stop_id === stopId));
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
        setDirection(
          response.data.find(
            (d) => Number(d.direction_id) === Number(directionId)
          )
        );
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
