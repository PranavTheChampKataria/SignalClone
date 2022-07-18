import { View, Text, TextInput, Button } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import styles from './styles'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authentication } from '../Firebase';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const register=()=>{
        createUserWithEmailAndPassword(authentication, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile({
                displayName:name,
                photoURL:imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZTgJiqRWL5wWednBz8zyRUhSuEDTzefieg&usqp=CAU'
            })
          })
          .catch((error) => {
            alert(error.message);
          }); 
    }

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 30, fontSize: 30 }}>Create a Signal Account</Text>
            <View>
                <TextInput placeholder='Full Name' autoFocus
                    value={name} onChangeText={(text) => setName(text)}
                />
                <TextInput placeholder='Email' keyboardType='email-address'
                    value={email} onChangeText={(text) => setEmail(text)}
                />
                <TextInput placeholder='Password' secureTextEntry={true}
                    value={password} onChangeText={(text) => setPassword(text)}
                />
                <TextInput placeholder='Image URL (Optional)' keyboardType='url'
                    value={imageUrl} onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button title='Register' onPress={register} />
        </View>

    )
}

export default RegisterScreen