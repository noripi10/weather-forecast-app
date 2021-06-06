/* eslint-disable no-undef */
import React, { useContext, useEffect } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';
import { AuthUserContext } from '../lib/provider/AuthUserProvider';
import { ThemeContext } from '../lib/provider/ThemeProvider';

import { auth, getUserDocument } from '../lib/firebase';
import { getStorage, setStorage } from '../lib/storage';
import { useAdmobPermission } from '../hooks/useAdmobPermission';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RouteNavigator = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(AuthUserContext);
  const scheme = useColorScheme();
  // トラッキング設定取得
  const { tracking } = useAdmobPermission();

  useEffect(() => {
    AsyncStorage.getAllKeys().then(async (keys) => {
      const items = await Promise.all(
        keys.map(async (key) => {
          const data = await AsyncStorage.getItem(key);
          return { key, data };
        })
      );
      if (__DEV__) {
        console.log({ items });
      }
    });
  }, []);

  useEffect(() => {
    // asyncStorageへ設定保存
    setStorage('tracking', tracking);
  }, [tracking]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        getUserDocument(authUser)
          .then((userInfo) => {
            setUser({ ...authUser, userInfo });
          })
          .catch(() => {
            setUser({ ...authUser, userInfo: {} });
          });
      } else {
        setUser(null);
      }
    });
    getStorage('theme')
      .then((theme) => {
        setTheme(theme || '');
      })
      .catch((err) => {
        console.log({ err });
      });
    return () => {
      unsubscribe();
    };
  }, [setUser, setTheme]);

  const absoluteTheme = theme || scheme;

  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={absoluteTheme === 'dark' ? DarkTheme : DefaultTheme}
        onStateChange={() => {
          // console.log({ state });
        }}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AppearanceProvider>
  );
};
