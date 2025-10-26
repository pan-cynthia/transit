import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Nearby from './pages/Nearby';
import RouteDetail from './pages/RouteDetail';
import Search from './pages/Search';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/nearby" element={<Nearby />} />
      <Route
        path="/route/:routeId/:directionId/:stopId"
        element={<RouteDetail />}
      />
    </Routes>
  );
};

export default App;
