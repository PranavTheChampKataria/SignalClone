import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Input, Icon } from '@rneui/base'
import { db } from '../Firebase'
import { collection, doc, addDoc, setDoc } from "firebase/firestore";

const AddChatScreen = () => {
  const navigation=useNavigation()
  useLayoutEffect(()=>{
    navigation.setOptions({
      title:'Add a new Chat',
      headerBackTitle:'Chat',
      
    })
  },[navigation])

  const [input,setInput]=useState('')

  const createChat = async () =>{

       await addDoc(collection(db,'chats'),{
      chatName:input
    }).then(()=>{
      navigation.goBack()
    }).catch((error)=>alert(error))
  }

  return (
    <View style={styles.container}>
      <Input placeholder='Enter a chat name' value={input} onChangeText={(text)=>
      setInput(text)} leftIcon={<Icon name='wechat' type='antdesign'
      size={24} color='black'/>} onSubmitEditing={createChat}
      />
      <Button title='Create new chat' onPress={createChat}/>
    </View>
    
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    padding:30,
    height:'100%'
  }
})