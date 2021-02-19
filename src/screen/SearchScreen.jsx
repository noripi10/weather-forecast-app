import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button, SearchBar } from 'react-native-elements';

import { useLocationPermission } from '../hooks/useLocationPermission';
import { TouchIcon } from '../component/TouchIcon';

export const SearchScreen = ({}) => {
	const [searchValue, setSearchValue] = useState('');
	const [locationInfo, setLocationInfo] = useState({});
	const { dark, colors } = useTheme();
	const permission = useLocationPermission();

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}
			>
				<SearchBar
					platform="ios"
					cancelButtonTitle="キャンセル"
					placeholder="都市名を検索"
					round
					lightTheme={!dark}
					searchIcon={<TouchIcon name="search" />}
					value={searchValue}
					onChange={(text) => setSearchValue(text)}
					containerStyle={{ width: '100%' }}
				/>
				{/* <Button title="検索" style={{ width: '20%' }} /> */}
			</View>
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
