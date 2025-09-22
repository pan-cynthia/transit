const PredictionItem = ({ time }) => {
  return (
    <div className="bg-amber-200 rounded mr-2 p-2 text-sm font-medium">
      <span>{time}</span>
    </div>
  );
};

export default PredictionItem;
