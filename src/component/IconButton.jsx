import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const IconButton = ({ name, size, color, ...anotherProps }) => {
	return (
		<TouchableOpacity style={styles.container} {...anotherProps}>
			<Ionicons name={name} size={size} color={color} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
