import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput,ToastAndroid,TouchableOpacity ,View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../../Components/Color'
import Logo from '../../../assets/Images/logo.png'
import { Ionicons } from '@expo/vector-icons';
import { Toast } from 'toastify-react-native';
import { LoginApi } from '../../Api/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkTokenAndProceed } from '../../Components/Tokencheck/TockenCheck';


const Login = ({navigation}) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //  const token = AsyncStorage.getItem('authToken');
    //  if(token) {
    //   navigation.navigate('home');
    //  }
 
    // }, []);

    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };
    const validateAndSubmit =async () => {
      try {
      //  validation
      if (username.trim() === '') {
        Toast.error('email is required');
        return;
      }
  
      if (password.trim() === '') {
        Toast.error('Password is required');
        return;
      }
      const response = await LoginApi({email:username,password});
      const expiryDate = new Date().getTime() + 24 * 60 * 60 * 1000;
      if(response.success){
        Toast.success("Login successfully")
        console.log(response);
        await AsyncStorage.setItem('authToken', response.token);
        await AsyncStorage.setItem('tokenExpiry', expiryDate.toString());
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.user));
        navigation.replace(`home`);
      }else{
        Toast.error(`${response.message}`)
      }
      } catch (error) {
        console.log(error);
        ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
      }
    };

  return (
    <ScrollView>
         <StatusBar  barStyle="dark-content" translucent={false} backgroundColor="#fff"/>
         <View style={styles.topcircle}></View>
            <View style={styles.imageview}>
                <Image source={Logo} style={styles.image}/>
            </View>
                <TextInput style={styles.Inputfield} placeholder='email' value={username} onChangeText={setUsername}/>
                <View style={styles.inputContainer}>
                     <TextInput style={styles.inputField} placeholder='Password'  value={password}
                       onChangeText={setPassword} secureTextEntry={secureTextEntry}/>
                        <TouchableOpacity onPress={toggleSecureEntry} style={styles.toggleButton}>
                            <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color='black' />
                        </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.submitbtn}  onPress={validateAndSubmit}>
                    <Text style={styles.btntext}>Submit</Text>
                </TouchableOpacity>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
    topcircle:{
        width:160,
        backgroundColor:Color.maincolor,
        height:150,
        borderBottomRightRadius:150
    },
    image:{
        height:185,
        width:185,
        marginVertical:45,
    },
    imageview:{
        alignItems:"center"
    },
    Inputfield:{
        height:45,
        width:"100",
        marginHorizontal:35,
        marginVertical:15,
        borderColor: Color.maincolor,
        borderWidth:2,
        paddingLeft:25,
        borderRadius:10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal:35,
        marginVertical:15,
        borderColor: Color.maincolor,
        borderWidth:2,
        paddingLeft:25,
        borderRadius:10,
      },
      inputField: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
      },
      toggleButton: {
        padding: 10,
      },
      submitbtn:{
        backgroundColor:Color.maincolor,
        width:"100",
        height:45,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
        marginHorizontal:35,
        marginVertical:15,
      },
      btntext:{
        color:Color.whitecolor,
      }
})