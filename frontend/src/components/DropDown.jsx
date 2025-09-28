const DropDown = ({
  options,
  value,
  onChange,
  getOptionKey,
  getOptionValue,
  getOptionLabel,
}) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={getOptionKey(option)} value={getOptionValue(option)}>
          {getOptionLabel(option)}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
