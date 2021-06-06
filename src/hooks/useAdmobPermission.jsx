import { useEffect, useState } from 'react';
import { getPermissionsAsync, requestPermissionsAsync } from 'expo-ads-admob';

export const useAdmobPermission = () => {
  const [tracking, setTracking] = useState(false);

  const permissionSetting = async () => {
    const { status } = await getPermissionsAsync();
    if (status === 'granted') {
      setTracking(true);
    } else {
      const { status: askStatus } = await requestPermissionsAsync();
      if (askStatus === 'granted') {
        setTracking(true);
      } else {
        setTracking(false);
      }
    }
  };
  useEffect(() => {
    permissionSetting();
  }, []);

  return { tracking };
};
