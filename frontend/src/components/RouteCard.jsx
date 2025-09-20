import PredictionItem from './PredictionItem';

const RouteCard = () => {
  return (
    <div className="rounded-lg bg-white mb-2 p-4">
      <h2 className="font-bold text-lg mb-1">Silver Ave & Mission St</h2>
      <h2 className="font-bold text-blue-900 mb-1">44 O'Shaughnessy</h2>
      <h3 className="text-sm">California + 6th Ave</h3>
      <div className="flex justify-end">
        <PredictionItem />
        <PredictionItem />
        <PredictionItem />
      </div>
    </div>
  );
};

export default RouteCard;
