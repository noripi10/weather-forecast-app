import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { Alert } from 'react-native';
import Env from './Env.json';

if (!firebase.apps.length) {
	firebase.initializeApp(Env.firebaseConfig);
}

export const auth = firebase.auth();

export const signInAnonymous = async () => {
	await auth.signInAnonymously();
};

export const registerWithEmail = async (email, password) => {
	try {
		await auth.createUserWithEmailAndPassword(email, password);
	} catch (err) {
		console.log({ err });
		Alert.alert('認証エラー', 'Emailアドレスまたはパスワードを確認して下さい');
	}
};

export const loginWithEmail = async (email, password) => {
	try {
		await auth.signInWithEmailAndPassword(email, password);
	} catch (err) {
		console.log({ err });
		Alert.alert('認証エラー', 'Emailアドレスまたはパスワードを確認して下さい');
	}
};

export const linkUserEmailPassword = async (email, password) => {
	const credential = new firebase.auth.EmailAuthProvider.credential(
		email,
		password
	);
	await auth.currentUser.linkWithCredential(credential);
};

export const signOut = async () => {
	await auth.signOut();
};

export const passwordReset = async (email) => {
	await auth.sendPasswordResetEmail(email);
};

export default firebase;
