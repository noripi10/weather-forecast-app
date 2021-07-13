import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchScreen } from '../screen/SearchScreen';
import { LocationScreen } from '../screen/LocationScreen';
import { ListScreen } from '../screen/ListScreen';
import { UserScreen } from '../screen/UserScreen';
import { ChatScreen } from '../screen/ChatScreen';
import { FeatherIcon } from '../component/FeatherIcon';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Location'
      screenOptions={({ route }) => ({
        tabBarIcon: function funcTabBarIcon({ size, color }) {
          // prop {focused, size, color }
          let iconName;
          if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Location') {
            iconName = 'map-pin';
          } else if (route.name === 'User') {
            iconName = 'user';
          } else {
            iconName = 'code';
          }
          return <FeatherIcon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: function funcTabBarLabel({ color }) {
          // prop {focused, color, position }
          let label;
          if (route.name === 'Search') {
            label = '検索';
          } else if (route.name === 'Location') {
            label = '現在地';
          } else if (route.name === 'User') {
            label = 'ユーザー';
          } else if (route.name === 'List') {
            label = '住所検索';
          }
          return <Text style={{ color: color, fontSize: 10 }}>{label}</Text>;
        },
      })}>
      <Tab.Screen name='Search' component={SearchScreen} />
      <Tab.Screen name='Location' component={LocationScreen} />
      <Tab.Screen name='List' component={ListScreen} />
      <Tab.Screen name='User' component={UserScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator headerMode='none' initialRouteName='Tabs' mode='modal'>
      <Stack.Screen name='Tabs' component={TabNavigator} />
      <Stack.Screen name='Chat' component={ChatScreen} />
    </Stack.Navigator>
  );
};
