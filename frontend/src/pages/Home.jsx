import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser.');
      navigate('/search');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        navigate('/nearby', { state: { latitude, longitude } });
      },
      (error) => {
        console.log('Error getting user location', error);
        navigate('/search');
      }
    );
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center justify-center bg-amber-200 p-5 shadow-xl">
        <div className="bg-amber-200">
          <svg
            className="mr-2 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <h1 className="font-medium">Loading ...</h1>
      </div>
    </div>
  );
};

export default Home;
