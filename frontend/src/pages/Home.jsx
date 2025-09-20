import SideBar from '../components/SideBar';

const Home = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-2/3 m-5">Map</div>
    </div>
  );
};

export default Home;
