import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '@react-navigation/native';
import { Button, Card, Divider, SearchBar } from 'react-native-elements';
import moment from 'moment';
import { useLocationPermission } from '../hooks/useLocationPermission';
import { TouchIcon } from '../component/TouchIcon';
import { Dimensions } from 'react-native';
import { AppButton } from '../component/AppButton';
import { FlatList } from 'react-native-gesture-handler';
import { getMarkerLocationInfo } from '../lib/location';
import { FontAwesome5Icon } from '../component/FontAwesome5Icon';

export const SearchScreen = ({}) => {
	const [searching, setSearching] = useState(false);
	const [locationInfo, setLocationInfo] = useState(null);
	const [currentCoordinate, setCurrentCoordinate] = useState({
		latitude: 35.2992145,
		longitude: 136.6351822,
	});
	const { dark, colors } = useTheme();
	const permission = useLocationPermission();

	const getMakerLocation = async () => {
		setSearching(true);
		const info = await getMarkerLocationInfo(currentCoordinate);

		setLocationInfo(info);
		setSearching(false);
	};

	const ForecastItem = ({ item, index }) => {
		return (
			<View style={styles.renderItemContainer}>
				<Text style={[styles.date, { color: colors.text }]}>
					{moment(item.dt_txt).format('M/D (ddd) HH時')}
				</Text>
				<Text style={[styles.description, { color: colors.text }]}>
					{item.weather[0].description}
				</Text>
				<Text style={[styles.temp, { color: colors.text }]}>
					{Math.round((item.main.temp - 273.15) * 100) / 100}℃
				</Text>
				<Text style={[styles.clouds, { color: colors.text }]}>
					{item.clouds.all}%
				</Text>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.mapContainer}>
				<MapView
					style={[StyleSheet.absoluteFillObject, { backgroundColor: '#fff' }]}
					initialRegion={{
						latitude: 35.2992145,
						longitude: 136.6351822,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>
					<Marker
						draggable
						coordinate={currentCoordinate}
						onDragEnd={(event) => {
							setCurrentCoordinate(event.nativeEvent.coordinate);
						}}
					>
						<FontAwesome5Icon
							name="map-pin"
							color={dark ? 'blue' : 'black'}
							size={36}
						/>
					</Marker>
				</MapView>

				<Card
					containerStyle={[
						styles.weatherCard,
						{ height: '65%', backgroundColor: colors.card },
					]}
				>
					<Card.Title style={{ color: colors.text, textAlign: 'left' }}>
						{`3時間ごとの天気   ${(locationInfo && locationInfo.city) || ''}`}
					</Card.Title>
					<View
						style={{
							position: 'absolute',
							width: 100,
							right: 0,
							top: -20,
						}}
					>
						<AppButton
							title="検索"
							padding={0}
							onPress={() => getMakerLocation()}
						/>
					</View>
					<Card.Divider />
					<View
						style={[
							styles.cardItemContainer,
							{ height: '80%', flexDirection: 'column' },
						]}
					>
						<View style={styles.listTitle}>
							<Text style={[styles.date, { color: colors.text }]}>日時</Text>
							<Text style={[styles.description, { color: colors.text }]}>
								天気
							</Text>
							<Text style={[styles.temp, { color: colors.text }]}>気温</Text>
							<Text style={[styles.clouds, { color: colors.text }]}>
								降水確率
							</Text>
						</View>
						{locationInfo && locationInfo.forecastLater && (
							<FlatList
								data={locationInfo.forecastLater || []}
								keyExtractor={(item) => item.dt_txt}
								renderItem={(item, index) => ForecastItem(item, index)}
								ItemSeparatorComponent={() => (
									<View>
										<Divider />
									</View>
								)}
							/>
						)}
					</View>
				</Card>
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
	mapContainer: {
		flex: 1,
		position: 'relative',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 8,
	},
	map: {
		flex: 0.55,
		width: Dimensions.get('window').width,
	},
	weatherCard: {
		flex: 0.4,
		borderRadius: 5,
		width: '97%',
		// padding: 10,
	},
	cardItemContainer: {
		position: 'relative',
		flexDirection: 'row',
		width: '100%',
		height: '80%',
	},
	text: {
		fontSize: 14,
		paddingBottom: 5,
	},
	renderItemContainer: {
		width: '100%',
		height: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	listTitle: {
		width: '100%',
		flexDirection: 'row',
		height: 20,
	},
	date: {
		width: '30%',
		textAlign: 'center',
	},
	description: {
		width: '25%',
		textAlign: 'center',
	},
	temp: {
		width: '20%',
		textAlign: 'center',
	},
	clouds: {
		width: '20%',
		textAlign: 'center',
	},
});
