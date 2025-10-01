import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Nearby from './pages/Nearby';
import Search from './pages/Search';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/nearby" element={<Nearby />} />
    </Routes>
  );
};

export default App;
