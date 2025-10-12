import { useEffect, useState } from 'react';
import { LocationContext } from '../contexts/LocationContext';

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('prompt'); // granted, denied, prompt

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser.');
      setPermissionStatus('denied');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setPermissionStatus('granted');
      },
      (error) => {
        console.log('Error getting user location', error);
        setPermissionStatus('denied');
      }
    );
  };

  useEffect(() => {
    // only get user location if user allows location permissions
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted' || result.state === 'prompt') {
          getLocation();
        }
      });
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, getLocation, setLocation, permissionStatus }}
    >
      {children}
    </LocationContext.Provider>
  );
};
