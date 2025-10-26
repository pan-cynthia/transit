import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import PredictionItem from './PredictionItem';

const RouteCard = ({ stop, route }) => {
  const [routeInfo, setRouteInfo] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPredictions = async () => {
      const params = route ? { routeId: route.route_id } : {};
      try {
        const response = await api.get(`/stop/${stop.stop_id}`, { params });
        setRouteInfo(response.data); // returns the next 3 predictions for each line at a stop
      } catch (error) {
        console.error(error);
      }
    };

    fetchPredictions();

    const interval = setInterval(fetchPredictions, 30000); // fetch predictions every 30 seconds
    return () => clearInterval(interval);
  }, [stop, route]);

  const handleClick = (line) => {
    if (!line) return;
    const direction = routeInfo[line][0].direction;
    navigate(`/route/${line}/${direction}/${stop.stop_id}`, {
      state: { stop: stop },
    });
  };

  return (
    <>
      {/* only render one routecard per line, use other 2 predictions to display arrival times */}
      {Object.entries(routeInfo).map(([line, arrivals]) => (
        <div
          key={line}
          className={`mb-2 rounded-lg bg-white p-4`}
          onClick={() => handleClick(line)}
        >
          <h2 className="mb-1 text-lg font-bold">{stop.stop_name}</h2>
          <h2 className="mb-1 font-bold text-blue-900">
            {arrivals[0].line} {arrivals[0].name}
          </h2>
          <h3 className="text-sm">{arrivals[0].destination}</h3>
          <div className="flex justify-end">
            {arrivals.map((arrival, i) => (
              <PredictionItem key={i} time={arrival.time} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default RouteCard;
