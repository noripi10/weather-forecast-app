import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export const RenderItem = ({ item, onNavigateChatScreen }) => {
  const onPressItem = () => {
    const address = item.city + item.town;
    onNavigateChatScreen(address);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPressItem}>
      <View>
        <Text style={styles.name}>{`${item.city}${item.town}`}</Text>
        <Text style={styles.kana}>{`${item.city_kana}${item.town_kana}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

RenderItem.propTypes = {
  item: PropTypes.object,
  onNavigateChatScreen: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#a1cce0',
    margin: 4,
  },
  name: {
    fontSize: 14,
  },
  kana: {
    fontSize: 8,
  },
});
