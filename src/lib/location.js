import * as Location from 'expo-location';
import { Alert } from 'react-native';
import sample_forecast from './sample_forecast.json';
import moment from 'moment';

export const getLocationInfo = async () => {
	try {
		const position = await Location.getCurrentPositionAsync();
		const { latitude, longitude } = position.coords;
		const reverseGeo = await Location.reverseGeocodeAsync({
			latitude,
			longitude,
		});

		const forecastTodayLast = sample_forecast.list
			.filter((item) => {
				return (
					moment().format('YYYYMMDD') ===
						moment(item.dt_txt).format('YYYYMMDD') &&
					moment() < moment(item.dt_txt)
				);
			})
			.slice(0)[0];

		const forecastTomorrow = sample_forecast.list
			.filter((item) => {
				return moment() < moment(item.dt_txt);
			})
			.slice(0)[0];

		const forecastLater = sample_forecast.list.filter((item) => {
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
	const reverseGeo = await Location.reverseGeocodeAsync({
		latitude,
		longitude,
	});
	const locationInfo = {
		latitude,
		longitude,
		...reverseGeo[0],
		forecastLater: sample_forecast.list,
	};
	return locationInfo;
};
