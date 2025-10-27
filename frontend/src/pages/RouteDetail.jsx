import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import api from '../api/axios';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import RouteCard from '../components/RouteCard';
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

    const fetchDirectionData = async () => {
      try {
        const response = await api.get(`/directions/${routeId}`);
        setDirection(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!stop) {
      fetchStopData();
    }

    if (!direction) {
      fetchDirectionData();
    }
  }, [stop, routeId, directionId, stopId, direction]);

  return (
    <div className="flex h-screen">
      <SideBar
        isOpen={isSideBarOpen}
        toggle={() => setIsSideBarOpen(!isSideBarOpen)}
      />
      <div className={`w-full ${isSideBarOpen ? 'ml-64' : 'ml-16'}`}>
        <NavBar />
        {stop && direction ? (
          <RouteCard
            key={stopId}
            stop={stop}
            routeId={routeId}
            isClickDisabled={true}
          />
        ) : (
          <div className="flex h-screen items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteDetail;
