import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input } from 'react-native-elements';

export const FormInput = (props) => {
	const { description, placeholder, ...anotherProps } = props;
	return (
		<View style={styles.container}>
			<Text style={styles.description}>{description}</Text>
			<Input {...anotherProps} placeholder={placeholder} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		width: '100%',
	},
	description: {
		paddingLeft: 10,
	},
});
