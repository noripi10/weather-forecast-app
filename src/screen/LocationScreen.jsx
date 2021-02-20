import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	Modal,
	TouchableOpacity,
	Dimensions,
	View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import { Header, Card, Divider } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import moment from 'moment';

import { useLocationPermission } from '../hooks/useLocationPermission';
import { getLocationInfo } from '../lib/location';
import { AppButton } from '../component/AppButton';
import colorList from '../lib/colorList';
// import { ForecastItem } from '../component/ForecastItem';

export const LocationScreen = ({}) => {
	const [searchValue, setSearchValue] = useState('');
	const [locationInfo, setLocationInfo] = useState(null);
	const [searching, setSearching] = useState(false);
	const { dark, colors } = useTheme();
	const permission = useLocationPermission();

	const getGeoLocation = async () => {
		setSearching(true);
		const info = await getLocationInfo();

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

	useEffect(() => {
		if (permission) {
			getGeoLocation();
		} else {
			setLocationInfo({});
		}
	}, [permission]);

	if (permission === null) {
		return (
			<View style={styles.noPermissionContainer}>
				<ActivityIndicator />
			</View>
		);
	}

	if (!permission) {
		return (
			<View style={styles.noPermissionContainer}>
				<Text style={{ fontSize: 18 }}>現在地を取得できませんでした</Text>
				<AppButton
					title="アプリ設定画面を開く"
					onPress={() => getGeoLocation()}
					color={colorList.grey3}
				/>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Header
				centerContainerStyle={{ fontSize: 26, color: '#fff' }}
				centerComponent={{
					text: '現在地',
					style: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
				}}
				rightComponent={
					<TouchableOpacity onPress={() => getGeoLocation()}>
						<Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
							再取得
						</Text>
					</TouchableOpacity>
				}
			/>

			<View style={styles.locationInfoContainer}>
				<Text style={{ fontSize: 18, color: colors.text }}>
					{locationInfo && locationInfo.city}
				</Text>
			</View>
			{locationInfo.forecastTodayLast && (
				<View style={styles.currentWeatherContainer}>
					<Card
						containerStyle={[
							styles.weatherCard,
							{ backgroundColor: colors.card },
						]}
					>
						<Card.Title style={{ color: colors.text }}>
							これからの天気
						</Card.Title>
						<Card.Divider />

						<View style={[styles.cardItemContainer]}>
							<View style={styles.cardLeftItemContainer}>
								<Text style={{ color: colors.text }}>
									{locationInfo.forecastTodayLast.weather[0].description}
								</Text>
								<LottieView
									style={{ width: 100, height: 100 }}
									loop
									autoPlay
									source={require('../../assets/weathers/4798-weather-snownight.json')}
								/>
							</View>
							<View style={styles.cardRightItemContainer}>
								<Text style={[styles.text, { color: colors.text }]}>
									{`${moment(locationInfo.forecastTodayLast.dt_txt).format(
										'M/D (ddd) HH:mm'
									)} 時点`}
								</Text>
								<Text style={[styles.text, { color: colors.text }]}>
									{`気温：${
										Math.round(
											(locationInfo.forecastTodayLast.main.temp - 273.15) * 100
										) / 100
									}℃`}
								</Text>
								<Text
									style={[styles.text, { color: colors.text }]}
								>{`湿度：${locationInfo.forecastTodayLast.main.humidity}%`}</Text>
								<Text style={[styles.text, { color: colors.text }]}>
									{`降水確率：${locationInfo.forecastTodayLast.clouds.all}%`}
								</Text>
							</View>
						</View>
					</Card>
					<Card
						containerStyle={[
							styles.weatherCard,
							{ height: '65%', backgroundColor: colors.card },
						]}
					>
						<Card.Title style={{ color: colors.text }}>
							3時間ごとの天気
						</Card.Title>
						<Card.Divider />
						<View
							style={[
								styles.cardItemContainer,
								{ height: '85%', flexDirection: 'column' },
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
							{locationInfo.forecastLater && (
								<FlatList
									data={locationInfo.forecastLater || []}
									keyExtractor={(item) =>
										item.dt_txt + Math.random().toString()
									}
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
			)}

			<Modal visible={searching} transparent={true}>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<ActivityIndicator size="large" />
					<Text>現在地取得中...</Text>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	noPermissionContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	locationInfoContainer: {
		width: '100%',
		// margin: 5,
		marginTop: 12,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	currentWeatherContainer: {
		flex: 1,
		margin: 5,
	},
	weatherCard: {
		width: Dimensions.get('window').width - 30,
		height: '30%',
		borderRadius: 5,
		// margin: 10,
	},
	cardItemContainer: {
		position: 'relative',
		flexDirection: 'row',
		width: '100%',
		height: '80%',
	},
	cardLeftItemContainer: {
		width: '45%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardRightItemContainer: {
		width: '55%',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingLeft: 5,
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
