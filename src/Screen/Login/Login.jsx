import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput,TouchableOpacity ,View } from 'react-native'
import React, { useState } from 'react'
import Color from '../../Components/Color'
import Logo from '../../../assets/Images/logo.png'
import { Ionicons } from '@expo/vector-icons';

const Login = ({navigation}) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };

  return (
    <ScrollView>
         <StatusBar  barStyle="dark-content" translucent={false} backgroundColor="#fff"/>
         <View style={styles.topcircle}></View>
            <View style={styles.imageview}>
                <Image source={Logo} style={styles.image}/>
            </View>
                <TextInput style={styles.Inputfield} placeholder='Username'/>
                <View style={styles.inputContainer}>
                     <TextInput style={styles.inputField} placeholder='Password' secureTextEntry={secureTextEntry}/>
                        <TouchableOpacity onPress={toggleSecureEntry} style={styles.toggleButton}>
                            <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color='black' />
                        </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.submitbtn}  onPress={() => navigation.navigate('home')}>
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