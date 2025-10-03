import { FaSearch } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const SideBar = ({ isOpen, toggle }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full shadow ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <button
        onClick={toggle}
        className={`flex h-16 w-16 items-center justify-center rounded-full`}
      >
        <IoMdMenu size={25} />
      </button>
      <nav className="flex flex-col">
        <NavLink
          to="/nearby"
          className={({ isActive }) =>
            `flex cursor-pointer items-center rounded ${isOpen ? 'h-16 space-x-2 pl-2' : 'h-24 flex-col justify-center py-5 text-xs'} ${isActive ? 'bg-[#d3d3d3]' : 'bg-[#f5f5f5]'}`
          }
        >
          <MdLocationOn size={30} className="mb-1" />
          <span>Nearby</span>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex cursor-pointer items-center rounded ${isOpen ? 'h-16 space-x-2 pl-4' : 'h-24 flex-col justify-center py-5 text-xs'} ${isActive ? 'bg-[#d3d3d3]' : 'bg-[#f5f5f5]'}`
          }
        >
          <FaSearch size={20} className="mb-1" />
          <span>Search</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
