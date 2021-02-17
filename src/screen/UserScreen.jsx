import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { auth } from '../lib/firebase/firebase';
export const UserScreen = ({}) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Text>{JSON.stringify(auth.currentUser)}</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {},
});
