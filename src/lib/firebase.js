import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { Alert } from 'react-native';
import Env from './Env.json';

if (!firebase.apps.length) {
	firebase.initializeApp(Env.firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();

export const signInAnonymous = async () => {
	const userCredential = await auth.signInAnonymously();
	const { uid } = userCredential.user;
	await createUserDocument(uid);
};

export const registerWithEmail = async (email, password) => {
	try {
		const userCredential = await auth.createUserWithEmailAndPassword(
			email,
			password
		);
		const { uid } = userCredential.user;
		await createUserDocument(uid, email);
	} catch (err) {
		console.log({ err });
		Alert.alert('認証エラー', 'Emailアドレスまたはパスワードを確認して下さい');
	}
};

export const loginWithEmail = async (email, password) => {
	try {
		const userCredential = await auth.signInWithEmailAndPassword(
			email,
			password
		);
		const { uid } = userCredential.user;
		await createUserDocument(uid, email);
	} catch (err) {
		console.log({ err });
		Alert.alert('認証エラー', 'Emailアドレスまたはパスワードを確認して下さい');
	}
};

export const getUserDocument = async (uid) => {
	const snapshot = await db.collection('users').doc(uid).get();
	const data = snapshot.data();
	return data;
};

export const updateUserDocument = async (uid, param) => {
	try {
		await db.collection('users').doc(uid).set(param);
	} catch (err) {
		console.log({ err });
		alert('ユーザー情報の更新に失敗しました');
	}
};

export const createUserDocument = async (uid, userName = '') => {
	const snapshot = await db.collection('users').doc(uid).get();
	if (!snapshot.exists) {
		await db.collection('users').doc(uid).set({
			userName,
			createDate: firebase.firestore.Timestamp.now(),
		});
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