import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const useLocationPermission = () => {
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === 'granted') {
        setPermission(true);
      } else {
        const { status: askStatus } = await Location.requestForegroundPermissionsAsync();
        if (askStatus === 'granted') {
          setPermission(true);
        } else {
          setPermission(false);
        }
      }
    })();
  }, []);

  return permission;
};
