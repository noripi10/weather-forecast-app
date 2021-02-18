import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppButton } from '../component/AppButton';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-elements';
import { useNavigation, useTheme } from '@react-navigation/native';
import { signInAnonymous } from '../lib/firebase/firebase';
import colorList from '../lib/colorList';

export const WelcomeScreen = ({}) => {
	const theme = useTheme();
	const navigation = useNavigation();

	const handleSignInAnonymous = async () => {
		await signInAnonymous();
	};

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={{ color: theme.colors.text }} h4>
					Myお天気予報
				</Text>
			</View>
			<View style={styles.lottieContainer}>
				<LottieView
					autoPlay
					resizeMode="contain"
					loop={false}
					speed={0.8}
					style={styles.lottie}
					source={require('../../assets/welcome.json')}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<AppButton
					title="ログイン"
					onPress={() => navigation.navigate('Login')}
					color={colorList.purple}
				/>
				<AppButton
					title="ユーザー登録"
					color={colorList.purple}
					onPress={() => navigation.navigate('Register')}
				/>
				<AppButton
					title="ログインしない"
					color={colorList.darkBlue}
					onPress={() => handleSignInAnonymous()}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginBottom: 100,
	},
	headerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: '15%',
	},
	lottieContainer: {
		justifyContent: 'center',
		alignContent: 'center',
		position: 'absolute',
		top: '30%',
	},
	lottie: {
		height: 300,
		width: 300,
	},
	buttonContainer: {
		width: '100%',
		padding: 20,
	},
});
