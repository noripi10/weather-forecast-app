import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { auth } from '../lib/firebase/firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { AppButton } from '../component/AppButton';
export const UserScreen = ({}) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Text>{JSON.stringify(auth.currentUser.uid)}</Text>
			</ScrollView>
			<AppButton title="ログアウト" onPress={() => handleSignOut()} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
