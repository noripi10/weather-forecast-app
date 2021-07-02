import React, { useContext, useEffect, useState, useMemo } from 'react';
import { View, SafeAreaView, Switch, Text, StyleSheet } from 'react-native';
import { Avatar, Divider, Input } from 'react-native-elements';
import { AdMobBanner } from 'expo-ads-admob';
import { useTheme } from '@react-navigation/native';

import { AppButton } from '../component/AppButton';
import colorList from '../lib/colorList';
import { AuthUserContext } from '../lib/provider/AuthUserProvider';
import { ThemeContext } from '../lib/provider/ThemeProvider';
import { getStorage, setStorage } from '../lib/storage';
import firebase, { signOut, updateUserDocument } from '../lib/firebase';

// const testID = 'ca-app-pub-3940256099942544/2934735716';
// const productionID = 'ca-app-pub-7379270123809470/7717398215';
// // Is a real device and running in production.
// const adUnitID = Constants.isDevice ? productionId : testID;

export const UserScreen = () => {
  const { user, setUser } = useContext(AuthUserContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [hasTracking, setTracking] = useState(false);
  const { colors } = useTheme();

  const toggleSwitch = (val) => {
    setIsEnabled((previousState) => !previousState);
    setTheme(val ? 'dark' : '');
    setStorage('theme', val ? 'dark' : '');
  };

  const updateUserInfo = async (key, val) => {
    await updateUserDocument(user.authUser.uid, {
      [key]: val,
      updateDate: firebase.firestore.Timestamp.now(),
    });
    setUser((preUser) => ({
      ...preUser,
      userInfo: {
        ...preUser.userInfo,
        [key]: val,
      },
    }));
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const bannerError = () => {
    console.log('banner error');
  };

  const UserAvatar = useMemo(() => {
    if (user.photoURL) {
      return <Avatar rounded source={{ uri: user.photoURL }} size={90} />;
    } else {
      return (
        <Avatar
          containerStyle={{ backgroundColor: '#aaa' }}
          rounded
          icon={{ name: 'user', type: 'font-awesome' }}
          size={90}
        />
      );
    }
  }, [user]);

  useEffect(() => {
    getStorage('tracking')
      .then((tracking) => setTracking(tracking))
      .catch(() => setTracking(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>{UserAvatar()}</View>
      <View style={styles.settingContainer}>
        <Text style={{ color: colors.text }}>ユーザー名</Text>
        <Input
          disabled
          style={{
            color: colors.text,
            fontSize: 16,
            textAlign: 'right',
            paddingRight: 8,
          }}
          containerStyle={{ width: '90%' }}
          value={user.userInfo && user.userInfo.userName}
          onChangeText={(newName) => updateUserInfo('userName', newName)}
        />
      </View>
      {/* <View style={styles.settingContainer}>
				<Text style={{ color: colors.text }}>プッシュトークンキー</Text>
				<Input
					disabled
					style={{
						color: colors.text,
						fontSize: 16,
						textAlign: 'right',
						paddingRight: 8,
					}}
					containerStyle={{ width: '90%' }}
					value={user.userInfo && user.userInfo.pushToken}
				/>
			</View> */}
      <Divider style={[{ color: colorList.divider, width: '90%' }]} />
      <View style={styles.settingContainer}>
        <Text style={[{ color: colors.text }]}>ダークモード固定</Text>
        <Switch
          trackColor={{ false: '#767577', true: colorList.primary }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={theme === 'dark'}
        />
      </View>
      <Divider style={[{ color: colorList.divider, width: '90%' }]} />
      <View style={styles.buttonContainer}>
        <AppButton title='ログアウト' color={colorList.darkBlue} onPress={() => handleSignOut()} />
      </View>
      <AdMobBanner
        bannerSize='largeBanner'
        adUnitID={
          // eslint-disable-next-line no-undef
          __DEV__
            ? 'ca-app-pub-3940256099942544/2934735716' // テスト広告
            : 'ca-app-pub-7379270123809470/7717398215'
        }
        onDidFailToReceiveAdWithError={bannerError}
        servePersonalizedAds={hasTracking}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  avatarContainer: {
    marginTop: 16,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    paddingTop: 30,
    paddingHorizontal: 50,
  },
  buttonContainer: {
    flex: 6,
    justifyContent: 'flex-start',
    width: '100%',
    padding: 20,
  },
});
