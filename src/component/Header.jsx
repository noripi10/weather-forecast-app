import React from 'react';
import { Header } from 'react-native-elements';
import { IconButton } from './IconButton';

export const AppHeader = ({ title, iconString, rightPressHandle }) => {
	return (
		<Header
			centerContainerStyle={{ fontSize: 26, color: '#fff' }}
			centerComponent={{
				text: `${title}`,
				style: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
			}}
			rightComponent={
				<IconButton
					name={iconString}
					size={22}
					color="#fff"
					onPress={() => rightPressHandle()}
				/>
			}
		/>
	);
};
