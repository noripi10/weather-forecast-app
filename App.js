import { ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthUserProvider } from './src/lib/AuthUserProvider';
import { RouteNavigator } from './src/navigation/RouteNavigator';

export default function App() {
	return (
		<ThemeProvider>
			<AuthUserProvider>
				<RouteNavigator />
			</AuthUserProvider>
		</ThemeProvider>
	);
}
