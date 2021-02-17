import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AppButton } from '../component/AppButton';
import { signOut } from '../lib/firebase/firebase';
import { SafeAreaView } from 'react-native';

export const HomeScreen = ({}) => {
	const { colors } = useTheme();

	const handleSignOut = async () => {
		await signOut();
	};
	return (
		<SafeAreaView style={styles.container}>
			<Text style={{ color: colors.text }}>homeScreen</Text>
			<AppButton title="ログアウト" onPress={() => handleSignOut()} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
});
