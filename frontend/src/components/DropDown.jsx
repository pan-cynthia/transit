const DropDown = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.id} {option.name}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
