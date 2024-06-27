import { Image, ScrollView, StyleSheet,TouchableOpacity, Text, View, StatusBar } from 'react-native'
import React from 'react'
import Editicon from '../../../assets/Images/editicon.png'
import Printicon from '../../../assets/Images/printicon.png'
import Color from '../../Components/Color'

const Cargoview = () => {
  return (
    <View>
        <StatusBar barStyle="light-content" translucent={false} backgroundColor={Color.maincolor} />
      <View style={styles.Imageview}>
        <TouchableOpacity>
            <Image source={Editicon} style={styles.image}/>
       </TouchableOpacity>
       <TouchableOpacity>
            <Image source={Printicon} style={styles.image}/> 
       </TouchableOpacity>   
     </View>
     <ScrollView>
     <View style={styles.cstView}>
        <View style={styles.csthead}>
            <Text style={styles.csttexthead}>CUSTOMER</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Mobile</Text>
            <Text style={styles.csttext}>+91 54878545454</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Name</Text>
            <Text style={styles.csttext}>Ananthu pk</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Email</Text>
            <Text style={styles.csttext}>ananthu@gmail.com</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Address</Text>
            <Text style={styles.csttext}>Ananthu kuriekal kollam house Alapuzha kottayam </Text>
        </View>
     </View>
     <View style={styles.cstView}>
        <View style={styles.csthead}>
            <Text style={styles.csttexthead}>SENDER</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Mobile</Text>
            <Text style={styles.csttext}>+91 54878545454</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Name</Text>
            <Text style={styles.csttext}>Ananthu pk</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Email</Text>
            <Text style={styles.csttext}>ananthu@gmail.com</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Address</Text>
            <Text style={styles.csttext}>Ananthu kuriekal kollam house Alapuzha kottayam </Text>
        </View>
     </View>
     <View style={styles.cstView}>
        <View style={styles.csthead}>
            <Text style={styles.csttexthead}>RECIEVER</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Mobile</Text>
            <Text style={styles.csttext}>+91 54878545454</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Name</Text>
            <Text style={styles.csttext}>Ananthu pk</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Email</Text>
            <Text style={styles.csttext}>ananthu@gmail.com</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Address</Text>
            <Text style={styles.csttext}>Ananthu kuriekal kollam house Alapuzha kottayam </Text>
        </View>
     </View>
     <View style={styles.cstView}>
        <View style={styles.csthead}>
            <Text style={styles.csttexthead}>COLLECTION DETAILS</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Mobile</Text>
            <Text style={styles.csttext}>+91 54878545454</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Name</Text>
            <Text style={styles.csttext}>Ananthu pk</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Email</Text>
            <Text style={styles.csttext}>ananthu@gmail.com</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Address</Text>
            <Text style={styles.csttext}>Ananthu kuriekal kollam house Alapuzha kottayam </Text>
        </View>
     </View>
     <View style={styles.cstView}>
        <View style={styles.csthead}>
            <Text style={styles.csttexthead}>CHARGES & PAYMENTS</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Mobile</Text>
            <Text style={styles.csttext}>+91 54878545454</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Name</Text>
            <Text style={styles.csttext}>Ananthu pk</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Email</Text>
            <Text style={styles.csttext}>ananthu@gmail.com</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Address</Text>
            <Text style={styles.csttext}>Ananthu kuriekal kollam house Alapuzha kottayam </Text>
        </View>
     </View>
     
     </ScrollView>
    </View>
  )
}

export default Cargoview

const styles = StyleSheet.create({
    Imageview:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginVertical:15,
    },
    image:{
        height:35,
        width:35
    },
    cstView:{
        height:290,
        marginHorizontal:20,
        marginVertical:25,
        backgroundColor:Color.maincolor,
        borderRadius:15,
    },
    csthead:{
        backgroundColor:Color.whitecolor,
        marginHorizontal:25,
        justifyContent:"center",
        alignItems:"center",
        height:40,
        marginVertical:20,
        borderRadius:15,
    },
    csttexthead:{
        color:Color.Black,
        fontWeight:"900",
    },
    csttext: {
        color: Color.whitecolor,
        fontWeight: "900",
        width: 150, 
        flexWrap: 'wrap' 
    },
    mobView:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:8,
        marginHorizontal:15
    },
})