import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, TextInput } from 'react-native';
import { IconButton } from '../component/IconButton';
import { RenderItem } from '../component/RenderItem';
import { useNavigation } from '@react-navigation/native';
import { getLocations } from '../lib/location';

// memo化
const Item = React.memo(RenderItem);

export const ListScreen = () => {
  const [word, setWord] = useState('');
  const [list, setList] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    // console.log(getCurrentUserId());
  }, []);

  const onSearchLocation = useCallback(async () => {
    if (!word) {
      return false;
    }
    const locations = await getLocations(word);
    setList(locations);
  }, [word]);

  const onNavigateChatScreen = (address) => {
    navigation.navigate('Chat', { address });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderItem = useCallback(({ item }) => <Item {...{ item, onNavigateChatScreen }} />, []);

  return (
    <SafeAreaView style={styles.container}>
      <>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInput}
            value={word}
            onChangeText={(text) => setWord(text)}
            placeholder='住所検索'
          />
          <IconButton name='search-circle' size={48} color='#000' onPress={onSearchLocation} />
        </View>
        <FlatList
          data={list}
          keyExtractor={(item) => item.city + item.town}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    width: '70%',
    height: 43,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#000',
    borderRadius: 999,
    paddingHorizontal: 16,
  },
});
