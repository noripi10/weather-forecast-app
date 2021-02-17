import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { loginWithEmail } from '../lib/firebase/firebase';
import { useNavigation } from '@react-navigation/native';
import { AppButton } from '../component/AppButton';

export const LoginScreen = ({}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigation = useNavigation();

	const handleLogin = async () => {
		await loginWithEmail(email, password);
	};

	return (
		<View style={styles.container}>
			<AppButton title="ログイン" onPress={() => navigation.goBack()} />
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
