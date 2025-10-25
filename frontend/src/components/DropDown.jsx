import { useEffect, useRef, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

const DropDown = ({
  options,
  value,
  onChange,
  getOptionKey,
  getOptionValue,
  getOptionLabel,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLabel =
    typeof value === 'object' && value !== null
      ? getOptionLabel(value)
      : 'Select an Option';

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-md px-4 py-2"
      >
        <span className="truncate">{selectedLabel}</span>
        <RiArrowDropDownLine
          size={25}
          className={`${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <ul className="absolute z-5 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg">
          {options.map((option) => (
            <li
              key={getOptionKey(option)}
              onClick={() => {
                onChange(option); // set selected route, direction, or stop depending on which dropdown
                setOpen(false); // close dropdown menu
              }}
              className={`cursor-pointer px-4 py-2 ${getOptionValue(option) === getOptionValue(value) ? 'bg-[#9CCC65] font-medium text-[#1f3509]' : 'hover:bg-[#9CCC65]'}`}
            >
              {getOptionLabel(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
