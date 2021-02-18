import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const getLocationInfo = async () => {
	try {
		const position = await Location.getCurrentPositionAsync();
		const { latitude, longitude } = position.coords;
		const reverse = await Location.reverseGeocodeAsync({
			latitude,
			longitude,
		});

		const locationInfo = {
			...position.coords,
			...reverse[0],
		};

		return locationInfo;
	} catch (err) {
		console.log({ err });
		Alert.alert('位置情報の取得に失敗しました');
	}
};
