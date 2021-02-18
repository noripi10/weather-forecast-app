import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button, SearchBar } from 'react-native-elements';

import { useLocationPermission } from '../hooks/useLocationPermission';
import { getLocationInfo } from '../util/location';
import { TouchIcon } from '../component/TouchIcon';
import { AppButton } from '../component/AppButton';

export const SearchScreen = ({}) => {
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
			<View
				style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}
			>
				<SearchBar
					placeholder="都市名を検索"
					round
					lightTheme={!dark}
					searchIcon={<TouchIcon name="search" />}
					value={searchValue}
					onChange={(text) => setSearchValue(text)}
					containerStyle={{ width: '80%' }}
				/>
				<Button title="検索" style={{ width: '20%' }} />
			</View>
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
