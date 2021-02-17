import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screen/HomeScreen';
import { UserScreen } from '../screen/UserScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={HomeScreen} />
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
