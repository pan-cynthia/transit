import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import RouteCard from '../components/RouteCard';
import SideBar from '../components/SideBar';

const RouteDetail = () => {
  const { stopId } = useParams();
  const { state } = useLocation();

  const stop = state?.stop;
  const route = state?.route;

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <SideBar
        isOpen={isSideBarOpen}
        toggle={() => setIsSideBarOpen(!isSideBarOpen)}
      />
      <div className={`w-full ${isSideBarOpen ? 'ml-64' : 'ml-16'}`}>
        <NavBar />
        <RouteCard key={stopId} stop={stop} route={route} />
      </div>
    </div>
  );
};

export default RouteDetail;
