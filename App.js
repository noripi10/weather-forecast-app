import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from './src/lib/provider/ThemeProvider';
import { AuthUserProvider } from './src/lib/provider/AuthUserProvider';
import { RouteNavigator } from './src/navigation/RouteNavigator';

import moment from 'moment';

moment.locale('ja', {
	weekdays: [
		'日曜日',
		'月曜日',
		'火曜日',
		'水曜日',
		'木曜日',
		'金曜日',
		'土曜日',
	],
	weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
});

export default function App() {
	return (
		<ThemeProvider>
			<AuthUserProvider>
				<RouteNavigator />
			</AuthUserProvider>
		</ThemeProvider>
	);
}
