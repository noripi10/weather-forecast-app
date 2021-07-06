import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { useNavigation, useTheme } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';

import { AppButton } from '../component/AppButton';
import { FormInput } from '../component/FormInput';
import { FeatherIcon } from '../component/FeatherIcon';

import { registerCheck } from '../util/common';
import { loginWithEmail, signInGoogle, signInFacebook, signInApple } from '../lib/firebase';
import colorList from '../lib/colorList';

// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
  const [isAppleSignIn, setAppleSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [request, response, promptAsync] = Google.useAuthRequest({
  // Env.jsonに記載
  // });

  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleLogin = async () => {
    const check = registerCheck(email, password, password);
    if (!check.res) {
      Alert.alert(check.err);
      return false;
    }
    await loginWithEmail(email, password);
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      AppleAuthentication.isAvailableAsync().then(() => setAppleSignIn(true));
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <FormInput
          description='ユーザーID'
          placeholder='Email'
          leftIcon={<FeatherIcon name='mail' />}
          paddingLeft={15}
          keyboardType='email-address'
          autoCapitalize='none'
          value={email}
          onChangeText={(text) => setEmail(text)}
          color={colors.text}
        />
        <FormInput
          description='パスワード'
          placeholder='Password'
          leftIcon={<FeatherIcon name='key' />}
          inputContainer=''
          paddingLeft={15}
          secureTextEntry
          keyboardType='email-address'
          autoCapitalize='none'
          value={password}
          onChangeText={(text) => setPassword(text)}
          color={colors.text}
        />
        <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
          <Text style={{ color: colorList.grey3 }}>パスワードをお忘れの方はこちら</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <AppButton title='ログイン' color={colorList.purple} disabled={!email || !password} onPress={handleLogin} />
        </View>
      </View>

      <View style={styles.socialButtonContainer}>
        <SocialIcon title='Googleサインイン' button type='google' onPress={signInGoogle} />
        <SocialIcon title='Facebookサインイン' button type='facebook' onPress={signInFacebook} />
        {isAppleSignIn && (
          <SocialIcon style={styles.appleButton} title='Appleサインイン' button type='apple' onPress={signInApple} />
        )}

        <AppButton title='戻る' color={colorList.darkBlue} onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 100,
  },
  inputContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    paddingTop: 80,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    margin: 8,
  },
  socialButtonContainer: {
    flex: 6,
    justifyContent: 'flex-start',
    width: '100%',
    padding: 20,
  },
  appleButton: {
    borderWidth: 0.4,
  },
});
