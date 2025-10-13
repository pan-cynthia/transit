const DropDown = ({
  options,
  value,
  onChange,
  getOptionKey,
  getOptionValue,
  getOptionLabel,
}) => {
  const selectedValue =
    typeof value === 'object' && value !== null
      ? getOptionValue(value)
      : value || '';

  return (
    <select
      value={selectedValue}
      onChange={(e) => {
        const selected = options.find(
          (option) => getOptionValue(option) === e.target.value
        );
        onChange(selected || null);
      }}
    >
      {options.map((option) => (
        <option key={getOptionKey(option)} value={getOptionValue(option)}>
          {getOptionLabel(option)}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
