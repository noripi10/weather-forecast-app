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
import { useTheme } from '@react-navigation/native';
import { Header, Card } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import moment from 'moment';

import { useLocationPermission } from '../hooks/useLocationPermission';
import { getLocationInfo } from '../lib/location';
import { AppButton } from '../component/AppButton';
import colorList from '../lib/colorList';

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
			/>

			<View style={styles.locationInfoContainer}>
				<Text style={{ fontSize: 18 }}>
					{locationInfo && locationInfo.city}
				</Text>
				<TouchableOpacity onPress={() => getGeoLocation()}>
					<Text>再取得</Text>
				</TouchableOpacity>
			</View>
			{locationInfo && (
				<View style={styles.currentWeatherContainer}>
					<Card containerStyle={styles.weatherCard}>
						<Card.Title>今日の天気</Card.Title>
						<Card.Divider />

						<View style={styles.cardItemContainer}>
							<View style={styles.cardLeftItemContainer}>
								<Text>
									{locationInfo.forecastTodayLast.weather[0].description}
								</Text>
								<LottieView
									style={{ width: 120, height: 130 }}
									loop
									autoPlay
									source={require('../../assets/weathers/4798-weather-snownight.json')}
								/>
							</View>
							<View style={styles.cardRightItemContainer}>
								<Text style={{ fontSize: 14, paddingBottom: 5 }}>
									{`${moment(locationInfo.forecastTodayLast.dt_txt).format(
										'M/D (ddd) HH:mm'
									)} 時点`}
								</Text>
								<Text style={{ fontSize: 14, paddingBottom: 5 }}>
									{`気温：${
										Math.round(
											(locationInfo.forecastTodayLast.main.temp - 273.15) * 100
										) / 100
									}℃`}
								</Text>
								<Text
									style={{ fontSize: 14, paddingBottom: 5 }}
								>{`湿度：${locationInfo.forecastTodayLast.main.humidity}%`}</Text>
								<Text
									style={{ fontSize: 14, paddingBottom: 5 }}
								>{`降水確率：${locationInfo.forecastTodayLast.clouds.all}%`}</Text>
							</View>
						</View>
					</Card>
					<Card containerStyle={styles.weatherCard}>
						<Card.Title>明日の天気</Card.Title>
						<Card.Divider />
						<View style={styles.cardItemContainer}>
							<View style={styles.cardLeftItemContainer}>
								<LottieView
									loop
									autoPlay
									source={require('../../assets/weathers/4800-weather-partly-cloudy.json')}
								/>
							</View>
							<View style={styles.cardRightItemContainer}>
								<Text>right</Text>
							</View>
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
		margin: 10,
		marginTop: 20,
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
		height: '28%',
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
});
