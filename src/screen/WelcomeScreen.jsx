import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation, useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { AppButton } from '../component/AppButton';
import { signInAnonymous } from '../lib/firebase';
import colorList from '../lib/colorList';

export const WelcomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleSignInAnonymous = async () => {
    await signInAnonymous();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]} h4>
          {'ウェザリス\n~ weather forecast app ~'}
        </Text>
      </View>
      <View style={styles.lottieContainer}>
        <LottieView
          autoPlay
          resizeMode='contain'
          loop={false}
          speed={0.8}
          style={styles.lottie}
          source={require('../../assets/welcome.json')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title='ログイン' onPress={() => navigation.navigate('Login')} color={colorList.purple} />
        <AppButton title='ユーザー登録' color={colorList.purple} onPress={() => navigation.navigate('Register')} />
        <AppButton title='ログインしない' color={colorList.darkBlue} onPress={() => handleSignInAnonymous()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  lottie: {
    height: 300,
    width: 300,
  },
  buttonContainer: {
    width: '100%',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Caveat-Regular',
  },
});
