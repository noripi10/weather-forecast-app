import React, { useContext, useEffect } from 'react';
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

import { AuthUserContext } from '../lib/provider/AuthUserProvider';
import { ThemeContext } from '../lib/provider/ThemeProvider';

import { auth } from '../lib/firebase/firebase';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

export const RouteNavigator = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	const { user, setUser } = useContext(AuthUserContext);
	const scheme = useColorScheme();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// console.log({ authUser });
				setUser(authUser);
			} else {
				setUser(null);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AppearanceProvider>
			<NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
				{user ? <AppNavigator /> : <AuthNavigator />}
			</NavigationContainer>
		</AppearanceProvider>
	);
};
