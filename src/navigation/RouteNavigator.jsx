import React, { useContext, useEffect } from 'react';
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';
import { AuthUserContext } from '../lib/provider/AuthUserProvider';
import { ThemeContext } from '../lib/provider/ThemeProvider';

import { auth, getUserDocument } from '../lib/firebase';
import { getStorage } from '../lib/storage';

export const RouteNavigator = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	const { user, setUser } = useContext(AuthUserContext);
	const scheme = useColorScheme();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				getUserDocument(authUser.uid)
					.then((userInfo) => {
						setUser({ authUser, userInfo });
					})
					.catch((err) => {
						setUser({ authUser, userInfo: {} });
					});
			} else {
				setUser(null);
			}
		});

		getStorage('theme')
			.then((theme) => {
				setTheme(theme || '');
			})
			.catch((err) => {
				console.log({ err });
			});

		return () => {
			unsubscribe();
		};
	}, []);

	const absoluteTheme = theme || scheme;

	return (
		<AppearanceProvider>
			<NavigationContainer
				theme={absoluteTheme === 'dark' ? DarkTheme : DefaultTheme}
				onStateChange={(state) => {
					// console.log({ state });
				}}
			>
				{user ? <AppNavigator /> : <AuthNavigator />}
			</NavigationContainer>
		</AppearanceProvider>
	);
};
