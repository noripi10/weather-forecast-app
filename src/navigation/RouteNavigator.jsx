/* eslint-disable no-undef */
import React, { useContext, useEffect, useCallback, useState, useMemo } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';
import { AuthUserContext } from '../lib/provider/AuthUserProvider';
import { ThemeContext } from '../lib/provider/ThemeProvider';

import { auth, getUserDocument } from '../lib/firebase';
import { getStorage, setStorage } from '../lib/storage';
import { useAdmobPermission } from '../hooks/useAdmobPermission';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RouteNavigator = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthUserContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const scheme = useColorScheme();
  const absoluteTheme = theme || scheme;
  // トラッキング設定取得
  const { tracking } = useAdmobPermission();

  const CustomDarkTheme = useMemo(() => {
    const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: 'rgba(10,10,10,1)' } };
    return theme;
  }, []);

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

  // 認証ユーザーの変更監視
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

  // ローディング処理（フォントなど）
  const loadFunc = useCallback(async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        'Caveat-Regular': {
          uri: require('../../assets/Fonts/Caveat-Regular.ttf'),
          display: Font.FontDisplay.FALLBACK,
        },
      });

      await new Promise((resolve) => {
        setTimeout(() => resolve('ok'), 3000);
      });
    } catch (err) {
      console.log(err);
    } finally {
      await SplashScreen.hideAsync();
    }
  }, []);

  if (loading) {
    return <AppLoading startAsync={loadFunc} onFinish={() => setLoading(false)} onError={(err) => console.log(err)} />;
  }

  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={absoluteTheme === 'dark' ? CustomDarkTheme : DefaultTheme}
        onStateChange={() => {
          // console.log({ state });
        }}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AppearanceProvider>
  );
};
