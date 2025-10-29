import { useState } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const Error = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <SideBar
        isOpen={isSideBarOpen}
        toggle={() => setIsSideBarOpen(!isSideBarOpen)}
      />
      <div className={`${isSideBarOpen ? 'ml-64' : 'ml-16'}`}>
        <NavBar />
        <h1 className="flex h-[calc(100vh-64px)] items-center justify-center text-xl font-medium">
          Route Not Found
        </h1>
      </div>
    </>
  );
};

export default Error;
