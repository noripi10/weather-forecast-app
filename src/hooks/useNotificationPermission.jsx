import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';

export const userNotificationPermissions = () => {
	const [permission, setPermission] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } = await Notifications.getPermissionsAsync();
			if (status === 'granted') {
				setPermission(true);
			} else {
				const {
					status: askStatus,
				} = await Notifications.requestPermissionsAsync();
				if (askStatus === 'granted') {
					setPermission(true);
				} else {
					setPermission(false);
				}
			}
		})();
	}, []);

	return permission;
};
