import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppButton } from '../component/AppButton';
import { FormInput } from '../component/FormInput';

export const RegisterScreen = () => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<FormInput />
			<AppButton title="戻る" onPress={() => navigation.goBack()} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
