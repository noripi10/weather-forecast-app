import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';

import { useLocationPermission } from '../hooks/useLocationPermission';
import { getLocationInfo } from '../util/location';

export const LocationScreen = ({}) => {
	const [searchValue, setSearchValue] = useState('');
	const [locationInfo, setLocationInfo] = useState({});
	const { dark, colors } = useTheme();
	const permission = useLocationPermission();

	const getGeoLocation = async () => {
		const coords = await getLocationInfo();
		setLocationInfo(coords);
	};
	useEffect(() => {
		if (permission) {
			getGeoLocation();
		} else {
			setLocationInfo({});
		}
	}, [permission]);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={{ color: colors.text }}></Text>
			<Text>{permission ? 'OK' : 'NG'}</Text>
			<Text>{JSON.stringify(locationInfo)}</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		// alignItems: 'center',
	},
});
