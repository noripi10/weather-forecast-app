import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import { useTheme } from '@react-navigation/native';
export const ForecastItem = ({ item, index }) => {
	const { colors } = useTheme();
	return (
		<View style={styles.container}>
			<Text style={[styles.date, { color: colors.text }]}>
				{moment(item.dt_txt).format('M/D (ddd) HH時')}
			</Text>
			<Text style={styles.description}>{item.weather[0].description}</Text>
			<Text style={styles.temp}>
				{Math.round((item.main.temp - 273.15) * 100) / 100}℃
			</Text>
			<Text style={styles.clouds}>{item.clouds.all}%</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
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
