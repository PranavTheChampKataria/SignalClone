import { View, Text, StatusBar, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import CustomListItem from '../components/CustomListItem'
import { useNavigation } from '@react-navigation/native'
import { authentication, db } from '../Firebase'
import { getAuth, signOut } from 'firebase/auth'
import { Avatar } from '@rneui/base'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { collection, onSnapshot } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {

  const [chats, setChats] = useState([])
  const navigation = useNavigation()

  const signOutUser = () => {
    signOut(authentication).then(() => {
      navigation.replace('Login')
    }).catch((error) => {
      alert(error.message)
    });
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })))
    });
    return unsubscribe();
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: 'black',
      headerTitleStyle: { color: 'black' },
      headerLeft: () => {
        return (<View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Avatar rounded source={{ uri: authentication?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>)
      },
      headerRight: () => {
        return (
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20
          }}>
            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name='camerao' size={24} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}
              onPress={() => navigation.navigate('AddChat')}>
              <SimpleLineIcons name='pencil' size={24} color={'black'} />
            </TouchableOpacity>
          </View>
        )
      }
    })
  }, [navigation])

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id, chatName
    })
  }

  return (
    <SafeAreaView>
      <StatusBar style='light' />
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) =>
          (<CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen