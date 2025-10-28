import { useNavigate } from 'react-router-dom';
import { usePredictions } from '../../hooks/usePredictions';
import Loading from './Loading';
import PredictionItem from './PredictionItem';

const RouteCard = ({ stop, routeId, direction, isClickDisabled }) => {
  const navigate = useNavigate();

  const { predictions, isLoading } = usePredictions(stop, routeId);

  const handleClick = (line) => {
    if (isClickDisabled || !line || !predictions[line]) return;
    const directionId = predictions[line][0].direction;

    navigate(`/route/${line}/${directionId}/${stop.stop_id}`, {
      state: { stop, direction },
    });
  };

  if (isLoading && Object.keys(predictions).length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <>
      {/* only render one routecard per line, use other 2 predictions to display arrival times */}
      {Object.keys(predictions).length > 0
        ? Object.entries(predictions).map(([line, arrivals]) => (
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
        : !isLoading && (
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
