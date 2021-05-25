import * as Location from 'expo-location';
import { Alert } from 'react-native';
import Env from './Env.json';
// import sample_forecast from './sample_forecast.json';
import moment from 'moment';

const apiKey = Env.openWeatherConfig.apiKey;

export const getLocationInfo = async () => {
  try {
    const position = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = position.coords;
    const reverseGeo = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const uri =
      'http://api.openweathermap.org/data/2.5/forecast?lang=ja&lat=' +
      latitude +
      '&lon=' +
      longitude +
      '&appid=' +
      apiKey;
    // console.log(uri);
    const response = await fetch(uri);
    const data = await response.json();
    const { list } = data;
    const forecastTodayLast = list
      .filter((item) => {
        return (
          // moment().format('YYYYMMDD') ===
          // 	moment(item.dt_txt).format('YYYYMMDD') &&
          moment() < moment(item.dt_txt)
        );
      })
      .slice(0)[0];

    const forecastTomorrow = list
      .filter((item) => {
        return moment() < moment(item.dt_txt);
      })
      .slice(0)[0];

    const forecastLater = list.filter((item) => {
      return moment(forecastTomorrow.dt_txt) < moment(item.dt_txt);
    });

    const locationInfo = {
      ...position.coords,
      ...reverseGeo[0],
      forecastTodayLast,
      forecastTomorrow,
      forecastLater,
    };

    return locationInfo;
  } catch (err) {
    console.log({ err });
    Alert.alert('位置情報の取得に失敗しました');
    return false;
  }
};

export const getMarkerLocationInfo = async ({ latitude, longitude }) => {
  try {
    const reverseGeo = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const uri =
      'http://api.openweathermap.org/data/2.5/forecast?lang=ja&lat=' +
      latitude +
      '&lon=' +
      longitude +
      '&appid=' +
      apiKey;

    const response = await fetch(uri);
    const data = await response.json();
    const { list } = data;

    const locationInfo = {
      latitude,
      longitude,
      ...reverseGeo[0],
      forecastLater: list,
    };
    return locationInfo;
  } catch (err) {
    alert({ err });
    return false;
  }
};
