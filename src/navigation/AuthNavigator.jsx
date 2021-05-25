import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from '../screen/WelcomeScreen';
import { LoginScreen } from '../screen/LoginScreen';
import { RegisterScreen } from '../screen/RegisterScreen';
import { PasswordResetScreen } from '../screen/PasswordResetScreen';

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Welcome' headerMode='none'>
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='PasswordReset' component={PasswordResetScreen} />
    </Stack.Navigator>
  );
};
