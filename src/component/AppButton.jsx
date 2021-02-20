import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export const AppButton = (props) => {
	return (
		<View style={styles.container}>
			<Button
				{...props}
				buttonStyle={[
					styles.buttonStyle,
					{ backgroundColor: props.color || 'blue' },
				]}
				containerStyle={{ margin: 0 }}
				titleStyle={{
					fontSize: props.fontSize,
					padding: props.padding,
					margin: 0,
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 10,
	},
	buttonStyle: {
		padding: 12,
		width: '100%',
	},
});
