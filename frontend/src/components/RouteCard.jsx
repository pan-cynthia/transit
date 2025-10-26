import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import PredictionItem from './PredictionItem';

const RouteCard = ({ stop, routeId, isClickDisabled }) => {
  const [predictions, setPredictions] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!stop) return;

    const fetchPredictions = async () => {
      const params = routeId ? { routeId } : {};
      try {
        const response = await api.get(`/stop/${stop.stop_id}`, { params });
        setPredictions(response.data); // returns the next 3 predictions for each line at a stop
      } catch (error) {
        console.error(error);
      }
    };

    fetchPredictions();

    const interval = setInterval(fetchPredictions, 30000); // fetch predictions every 30 seconds
    return () => clearInterval(interval);
  }, [stop, routeId]);

  const handleClick = (line) => {
    if (isClickDisabled) return;
    if (!line) return;
    const direction = predictions[line][0].direction;
    navigate(`/route/${line}/${direction}/${stop.stop_id}`, {
      state: { stop: stop },
    });
  };

  return (
    <>
      {/* only render one routecard per line, use other 2 predictions to display arrival times */}
      {Object.keys(predictions).length > 0 ? (
        Object.entries(predictions).map(([line, arrivals]) => (
          <div
            key={line}
            className={`mb-2 rounded-lg bg-white p-4 ${isClickDisabled ? '' : 'cursor-pointer'}`}
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
        ))
      ) : (
        <div className="mb-2 rounded-lg bg-white p-4">
          <h2 className="mb-1 text-lg font-bold">{stop.stop_name}</h2>
          <h2 className="mb-1 font-bold text-blue-900">{routeId}</h2>
          <div className="flex justify-end">
            <PredictionItem key={0} time={'--'} />
          </div>
        </div>
      )}
    </>
  );
};

export default RouteCard;
