const DropDown = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.route_id} value={option.route_id}>
          {option.route_short_name} {option.route_long_name}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
