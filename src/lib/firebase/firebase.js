import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import Env from './Env.json';

if (!firebase.apps.length) {
	firebase.initializeApp(Env.firebaseConfig);
}

export const auth = firebase.auth();

export const signInAnonymous = async () => {
	await auth.signInAnonymously();
};

export const registerWithEmail = async (email, password) => {
	await auth.createUserWithEmailAndPassword(email, password);
};

export const loginWithEmail = async (email, password) => {
	await auth.signInWithEmailAndPassword(email, password);
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
