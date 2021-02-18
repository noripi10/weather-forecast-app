import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { loginWithEmail } from '../lib/firebase/firebase';
import { useNavigation } from '@react-navigation/native';
import { AppButton } from '../component/AppButton';
import colorList from '../lib/colorList';
import { FormInput } from '../component/FormInput';
import { FeatherIcon } from '../component/FeatherIcon';
import { registerCheck } from '../util/common';

export const LoginScreen = ({}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigation = useNavigation();

	const handleLogin = async () => {
		const check = registerCheck(email, password, password);
		if (!check.res) {
			Alert.alert(check.err);
			return false;
		}
		await loginWithEmail(email, password);
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
				<TouchableOpacity>
					<Text style={{ color: colorList.grey3 }}>
						パスワードをお忘れの方はこちら
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<AppButton
					title="ログイン"
					color={colorList.purple}
					disabled={!email || !password}
					onPress={() => handleLogin()}
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
		flex: 4,
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
	},
});
