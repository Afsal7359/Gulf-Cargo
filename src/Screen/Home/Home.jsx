import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Logo from '../../../assets/Images/logo.png'
import Color from '../../Components/Color'
import Truck from '../../../assets/Images/Truck.png'
import Tracking from '../../../assets/Images/tracking.png';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
  image: {
    height: 0.35 * windowWidth,
    width: 0.35 * windowWidth,
    marginVertical: windowWidth < 400 ? 65: 0.1 * windowWidth,
  },
  imageview: {
    alignItems: "center"
  },
  MainView1: {
    backgroundColor: Color.maincolor,
    width: 0.6 * windowWidth,
    height: 0.3 * windowWidth,
    alignSelf: "flex-end",
    borderTopLeftRadius: 0.05 * windowWidth,
    borderBottomLeftRadius: 0.05 * windowWidth,
    marginBottom: windowWidth < 400 ? 30: 0.1 * windowWidth,
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 45,
  },
  MainView2: {
    backgroundColor: Color.maincolor,
    width: 0.6 * windowWidth,
    height: 0.3 * windowWidth,
    justifyContent:"center",
    borderBottomRightRadius: 0.05 * windowWidth,
    borderTopRightRadius: 0.05 * windowWidth,
    marginVertical: windowWidth < 400 ? 65: 0. * windowWidth,
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
