import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

export const FormInput = (props) => {
	return (
		<View style={styles.container}>
			<Input {...props} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		width: '100%',
	},
});
