const PredictionItem = ({ time }) => {
  const formatTime = (time) => {
    const now = Date.now();
    const target = new Date(time).getTime();
    const diff = Math.ceil((target - now) / 1000 / 60);

    if (diff <= 0) return '0 min';
    return `${diff} min`;
  };

  return (
    <div className="bg-amber-200 rounded mr-2 p-2 text-sm font-medium">
      <span>{formatTime(time)}</span>
    </div>
  );
};

export default PredictionItem;
