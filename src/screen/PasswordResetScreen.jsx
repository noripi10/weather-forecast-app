import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	TouchableOpacity,
	Alert,
	AlertButton,
} from 'react-native';
import { passwordReset } from '../lib/firebase';
import { useNavigation, useTheme } from '@react-navigation/native';
import { AppButton } from '../component/AppButton';
import colorList from '../lib/colorList';
import { FormInput } from '../component/FormInput';
import { FeatherIcon } from '../component/FeatherIcon';
import { registerCheck } from '../util/common';

export const PasswordResetScreen = ({}) => {
	const [email, setEmail] = useState('');

	const { colors } = useTheme();
	const navigation = useNavigation();

	const handleResetMailSend = async () => {
		const { res } = registerCheck(email);
		if (!res) {
			Alert.alert('メールアドレスを正しく入力して下さい');
			return false;
		}

		const okButton = {
			text: 'はい',
			onPress: async () => await passwordReset(email),
			style: 'default',
		};
		const cancelButton = {
			text: 'いいえ',
			onPress: async () => false,
			style: 'cancel',
		};
		Alert.alert(
			'入力内容確認',
			`${email}へパスワードリセットメールを送信ますか？`,
			[okButton, cancelButton]
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inputContainer}>
				<View>
					<Text style={{ color: colors.text, textAlign: 'left' }}>
						入力いただいたEmailアドレスにパスワード再設定メールが送信されます。
					</Text>
					<Text style={{ color: colors.text, textAlign: 'left' }}>
						Emailアドレスを入力し送信を押して下さい
					</Text>
				</View>
				<FormInput
					description="ユーザーID"
					placeholder="Email"
					leftIcon={<FeatherIcon name="mail" />}
					paddingLeft={15}
					keyboardType="email-address"
					value={email}
					onChangeText={(text) => setEmail(text)}
					color={colors.text}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<AppButton
					title="メール送信"
					color={colorList.purple}
					disabled={!email}
					onPress={() => handleResetMailSend()}
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
		flex: 0.5,
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginTop: 100,
	},
	inputContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		padding: 40,
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		width: '100%',
		padding: 20,
	},
});
