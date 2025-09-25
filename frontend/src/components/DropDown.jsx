const DropDown = ({ options, value, onChange, type }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {type === 'line' ? `${option.id} ${option.name}` : option.name}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
