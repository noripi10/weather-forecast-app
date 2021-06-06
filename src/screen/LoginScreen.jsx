import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { useNavigation, useTheme } from '@react-navigation/native';

import { AppButton } from '../component/AppButton';
import { FormInput } from '../component/FormInput';
import { FeatherIcon } from '../component/FeatherIcon';

import { registerCheck } from '../util/common';
import { loginWithEmail, signInGoogle } from '../lib/firebase';
import colorList from '../lib/colorList';

// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
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

  // useEffect(() => {
  //   if (response?.type === 'success') {
  //     console.log({ response });
  //   }
  // }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <FormInput
          description='ユーザーID'
          placeholder='Email'
          leftIcon={<FeatherIcon name='mail' />}
          paddingLeft={15}
          keyboardType='email-address'
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
          value={password}
          onChangeText={(text) => setPassword(text)}
          color={colors.text}
        />
        <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
          <Text style={{ color: colorList.grey3 }}>パスワードをお忘れの方はこちら</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title='ログイン'
          color={colorList.purple}
          disabled={!email || !password}
          onPress={() => handleLogin()}
        />
        <SocialIcon
          title='Googleサインイン'
          button
          type='google'
          onPress={() => {
            signInGoogle();
          }}
        />
        {/* <AppButton
          title='Googleログイン'
          color={colorList.purple}
          onPress={() => {
            promptAsync();
          }}
          disabled={!request}
        /> */}
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
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 40,
  },
  buttonContainer: {
    flex: 6,
    justifyContent: 'flex-start',
    width: '100%',
    padding: 20,
  },
});
