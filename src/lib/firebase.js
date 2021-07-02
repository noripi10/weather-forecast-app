/* eslint-disable no-undef */
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
// import { registerForPushNotificationsAsync } from './notification';
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
    await auth.createUserWithEmailAndPassword(email, password);
  } catch (err) {
    console.log({ err });
    alert('Emailアドレスまたはパスワードを確認して下さい');
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.log({ err });
    alert('認証エラー', 'Emailアドレスまたはパスワードを確認して下さい');
  }
};

export const signInGoogle = async () => {
  try {
    const { type, idToken } = await Google.logInAsync(Env.googleConfig);
    if (type === 'success') {
      const credential = firebase.auth.GoogleAuthProvider.credential({
        idToken,
      });
      await auth.signInWithCredential(credential);
    } else {
      alert('Google認証に失敗しました');
    }
  } catch (err) {
    alert(err);
  }
};

export const signInFacebook = async () => {
  try {
    await Facebook.initializeAsync(Env.facebookConfig);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permission: ['public-profile'],
    });
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await auth.signInWithCredential(credential);
    }
  } catch (err) {
    alert(err);
  }
};

// authChange際に発動
export const getUserDocument = async (user) => {
  let data = {};
  const { uid, email, displayName } = user;

  const snapshot = await db.collection('users').doc(uid).get();
  if (!snapshot.exists) {
    data = {
      mail: email,
      userName: displayName || '',
      createData: firebase.firestore.Timestamp.now(),
    };
  } else {
    data = snapshot.data();
  }

  // pushTokenキーをセット
  // token変更などがあり得るので、createUserDocumentではなくここでやる
  // const pushToken = await registerForPushNotificationsAsync();
  // if (!data.pushToken || data.pushToken !== pushToken) {
  // 	await db.collection('users').doc(uid).set({ pushToken }, { merge: true });
  // 	data.pushToken = pushToken;
  // }

  await db.collection('users').doc(uid).set(data);
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
  const credential = new firebase.auth.EmailAuthProvider.credential(email, password);
  await auth.currentUser.linkWithCredential(credential);
};

export const signOut = async () => {
  await auth.signOut();
};

export const passwordReset = async (email) => {
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      alert('送信完了しました。再設定後ログイン処理を行って下さい');
    })
    .catch(() => {
      alert('送信に失敗しました。お手数ですが、しばらく時間をおいてから行って下さい');
    });
};

export default firebase;
