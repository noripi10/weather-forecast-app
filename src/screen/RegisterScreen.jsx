import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { registerWithEmail } from '../lib/firebase/firebase';
import { useNavigation } from '@react-navigation/native';
import { AppButton } from '../component/AppButton';
import { FormInput } from '../component/FormInput';
import { FeatherIcon } from '../component/FeatherIcon';
import { registerCheck } from '../util/common';
import colorList from '../lib/colorList';

export const RegisterScreen = ({}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const navigation = useNavigation();

	const handleRegister = async () => {
		const check = registerCheck(email, password, password2);
		if (!check.res) {
			Alert.alert(check.err);
			return false;
		}
		await registerWithEmail(email, password);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inputContainer}>
				<FormInput
					description="ユーザーID"
					placeholder="Email"
					leftIcon={<FeatherIcon name="mail" />}
					paddingLeft={15}
					keyboardType="email-address"
					onChangeText={(text) => setEmail(text)}
				/>
				<FormInput
					description="パスワード"
					placeholder="Password"
					leftIcon={<FeatherIcon name="key" />}
					inputContainer=""
					paddingLeft={15}
					secureTextEntry
					keyboardType="default"
					onChangeText={(text) => setPassword(text)}
				/>
				<FormInput
					description="パスワード再入力"
					placeholder="Password"
					leftIcon={<FeatherIcon name="key" />}
					inputContainer=""
					paddingLeft={15}
					secureTextEntry
					keyboardType="default"
					onChangeText={(text) => setPassword2(text)}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<AppButton
					title="ログイン"
					color={colorList.purple}
					disabled={!email || !password || !password2}
					onPress={() => handleRegister()}
				/>
				<AppButton
					title="戻る"
					color={colorList.darkBlue}
					onPress={() => navigation.goBack()}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 100,
	},
	inputContainer: {
		flex: 6,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		padding: 40,
	},
	buttonContainer: {
		flex: 6,
		justifyContent: 'flex-start',
		width: '100%',
		padding: 20,
		paddingTop: 0,
	},
});