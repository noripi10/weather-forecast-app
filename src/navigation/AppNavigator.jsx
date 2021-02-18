import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchScreen } from '../screen/SearchScreen';
import { UserScreen } from '../screen/UserScreen';
import { FeatherIcon } from '../component/FeatherIcon';
import { Text } from 'react-native';
import { LocationScreen } from '../screen/LocationScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, size, color }) => {
					let iconName;

					if (route.name === 'Search') {
						iconName = 'search';
					} else if (route.name === 'Location') {
						iconName = 'map-pin';
						size = 30;
					} else if (route.name === 'User') {
						iconName = 'user';
					}
					return <FeatherIcon name={iconName} size={size} color={color} />;
				},
				tabBarLabel: ({ focused, color, position }) => {
					let label;
					if (route.name === 'Search') {
						label = '検索';
					} else if (route.name === 'Location') {
						label = '現在地';
					} else if (route.name === 'User') {
						label = 'ユーザー';
					}
					return <Text style={{ color: color, fontSize: 10 }}>{label}</Text>;
				},
			})}
		>
			<Tab.Screen name="Search" component={SearchScreen} />
			<Tab.Screen name="Location" component={LocationScreen} />
			<Tab.Screen name="User" component={UserScreen} />
		</Tab.Navigator>
	);
};

export const AppNavigator = () => {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen name="Tabs" component={TabNavigator} />
		</Stack.Navigator>
	);
};
