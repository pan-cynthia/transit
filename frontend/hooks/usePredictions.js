import { useEffect, useState } from 'react';
import api from '../src/api/axios';

export const usePredictions = (stop, routeId, refreshInterval = 30000) => {
  const [predictions, setPredictions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!stop) return;
    let interval;
    let firstLoad = true;

    const fetchPredictions = async () => {
      if (firstLoad) {
        setIsLoading(true);
      }
      const params = routeId ? { routeId } : {};
      try {
        const response = await api.get(`/stop/${stop.stop_id}`, { params });
        setPredictions(response.data); // returns the next 3 predictions for each line at a stop
      } catch (error) {
        console.error(error);
      } finally {
        if (firstLoad) {
          setIsLoading(false);
          firstLoad = false;
        }
      }
    };

    fetchPredictions();

    if (refreshInterval) {
      interval = setInterval(fetchPredictions, refreshInterval); // fetch predictions every 30 seconds
    }

    return () => clearInterval(interval);
  }, [stop, routeId, refreshInterval]);

  return { predictions, isLoading };
};
