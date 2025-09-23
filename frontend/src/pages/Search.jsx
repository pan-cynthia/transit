import { useEffect, useState } from 'react';
import api from '../api/axios';
import DropDown from '../components/DropDown';

const Search = () => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const getLines = async () => {
      try {
        const response = await api.get('/lines');
        setLines(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getLines();
  }, []);

  return (
    <div className="mx-auto flex h-screen w-3/5 flex-col justify-center">
      <div className="flex h-[80vh] flex-col items-center rounded-xl border-2 border-slate-600 bg-amber-100">
        <h2 className="mt-7 p-5 text-xl font-medium">Find Stop by Route</h2>
        <div className="mt-7 flex w-3/4 justify-between rounded-xl bg-amber-200 p-5">
          <label className="font-medium">Route</label>
          <DropDown options={lines} />
        </div>
      </div>
    </div>
  );
};

export default Search;
