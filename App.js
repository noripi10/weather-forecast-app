import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from './src/lib/provider/ThemeProvider';
import { AuthUserProvider } from './src/lib/provider/AuthUserProvider';
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
