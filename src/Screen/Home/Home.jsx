import { Alert, Image, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Logo from '../../../assets/Images/logo.png'
import Color from '../../Components/Color'
import Truck from '../../../assets/Images/Truck.png'
import Tracking from '../../../assets/Images/tracking.png';
import Sender from '../../../assets/Images/sender.png';
import Reciever from '../../../assets/Images/reciever.png';
import { Dimensions } from 'react-native';
import { checkTokenAndProceed } from '../../Components/Tokencheck/TockenCheck'
import logouticon from '../../../assets/Images/logout.png'
import { Logout } from '../../Api/Login'
import AsyncStorage from '@react-native-async-storage/async-storage'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {

  useEffect(()=>{
    checkTokenAndProceed(navigation)
  },[])

  const handlelogoutclick = async()=>{
    try {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Logout cancelled'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              try {
            const response = await Logout();
            await AsyncStorage.removeItem('authToken')
            await AsyncStorage.removeItem('tokenExpiry');
            await AsyncStorage.removeItem('userInfo')
            navigation.replace('login');
            ToastAndroid.show("Logout Sucessfully !!",ToastAndroid.LONG)
              } catch (error) {
                console.error('Error during logout:', error);
                ToastAndroid.show("Network problem !!", ToastAndroid.LONG);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error)
     
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logouticon} onPress={handlelogoutclick}>
        <Image source={logouticon} style={styles.logouticons} />
      </TouchableOpacity>
      <StatusBar barStyle="light-content" translucent={false} backgroundColor={Color.maincolor} />
        <View style={styles.imageview}>
          <Image source={Logo} style={styles.image} />
        </View>
        <TouchableOpacity style={styles.MainView1} onPress={() => navigation.navigate("cargolist")}>
          <View style={styles.SubView1}>
            <Text style={styles.Subtext1}>Cargo</Text>
            <Image source={Truck} style={styles.truckimg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.MainView2} onPress={() => navigation.navigate("TrackingSearch")}>
          <View style={styles.SubView1}>
            <Image source={Tracking} style={styles.trackingimg} />
            <Text style={styles.Subtext2}>Tracking</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.MainView1} onPress={() => navigation.navigate("sender")}>
          <View style={styles.SubView1}>
            <Text style={styles.Subtext1}>Sender</Text>
            <Image source={Sender} style={styles.senderimg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.MainView2} onPress={() => navigation.navigate("reciever")}>
          <View style={styles.SubView1}>
            <Image source={Reciever} style={styles.trackingimg} />
            <Text style={styles.Subtext2}>Reciever</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.versionview}>
          <Text style={styles.versiontext}>version 1.23.8</Text>
        </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logouticons:{
    height:30,
    width:30
  },
  logouticon:{
    position:'absolute',
    right:10,
    top:15
  },
  image: {
    height: 0.30 * windowWidth,
    width: 0.30 * windowWidth,
    marginVertical: windowWidth < 400 ? 30: 0.1 * windowWidth,
  },
  imageview: {
    alignItems: "center"
  },
  MainView1: {
    backgroundColor: Color.maincolor,
    width: 0.53 * windowWidth,
    height: 0.26 * windowWidth,
    alignSelf: "flex-end",
    borderTopLeftRadius: 0.05 * windowWidth,
    borderBottomLeftRadius: 0.05 * windowWidth,
    marginBottom: windowWidth < 400 ? 10: 0.1 * windowWidth,
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 45,
  },
  MainView2: {
    backgroundColor: Color.maincolor,
    width: 0.53 * windowWidth,
    height: 0.26 * windowWidth,
    justifyContent:"center",
    borderBottomRightRadius: 0.05 * windowWidth,
    borderTopRightRadius: 0.05 * windowWidth,
    marginVertical: windowWidth < 400 ? 20: 0.1 * windowWidth,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 95,
  },
  truckimg: {
    width: 0.28 * windowWidth,
    height: 0.1 * windowWidth,
  },
  trackingimg: {
    height: 0.18 * windowWidth,
    width: 0.2 * windowWidth,
    marginVertical: 0.03 * windowWidth,
  },
  senderimg:{
    height: 0.18 * windowWidth,
    width: 0.2 * windowWidth,
  },
  SubView1: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  Subtext1: {
    color: Color.whitecolor,
    fontSize: 0.05 * windowWidth,
    fontWeight: "900"
  },
  Subtext2: {
    color: Color.whitecolor,
    fontSize: 0.05 * windowWidth,
    fontWeight: "900",
    marginVertical: 0.05 * windowWidth,
  },
  versiontext: {
    color: Color.Black,
    fontSize: 0.03 * windowWidth,
    textAlign: "center"
  },
  versionview: {
    position: "absolute",
    bottom: 25,
    width:windowWidth,
  },
})
