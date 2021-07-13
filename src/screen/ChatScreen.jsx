import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { roomInit, sendChat, db } from '../lib/firebase';

export const ChatScreen = () => {
  const subscribeRef = useRef(null);
  const [userUid, setUserUid] = useState('');
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [chats, setChats] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  const onSend = useCallback(
    (messages = []) => {
      setChats((previousMessages) => GiftedChat.append(previousMessages, messages));
      const currentChat = messages[0];
      sendChat(roomId, currentChat);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [roomId]
  );

  const init = async () => {
    const address = route.params?.address ?? '';
    if (address) {
      const { userUid, displayName, roomId, initChats } = await roomInit(address);
      setUserUid(userUid);
      setUserName(displayName);
      setRoomId(roomId);
      setChats(initChats);

      subscribeRef.current = db
        .collection('rooms')
        .doc(roomId)
        .collection('chats')
        .onSnapshot((snapshot) => {
          let newChats = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            newChats.push({ ...data, id: doc.id, createdAt: data.createdAt.toDate() });
          });
          newChats = newChats.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
              return -1;
            } else if (a.createdAt < b.createdAt) {
              return 1;
            } else {
              return 0;
            }
          });
          setChats(newChats);
        });
    }
  };

  useEffect(() => {
    init();
    return () => {
      if (subscribeRef.current) {
        subscribeRef.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  if (!userUid) {
    return null;
  }

  return (
    <>
      <GiftedChat
        placeholder='現在のお天気情報を入力'
        user={{ _id: userUid, name: userName }}
        messages={chats}
        onSend={onSend}
      />
      <View style={styles.navigationController}>
        <Button title='戻る' onPress={() => navigation.goBack()} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationController: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});
