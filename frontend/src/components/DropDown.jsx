const DropDown = ({ options }) => {
  return (
    <select>
      <option value="">Select a Route</option> {/* Default */}
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.id} {option.name}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
