import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Color from '../../Components/Color'
import { SearchBar } from 'react-native-elements';

const Cargolist = ({navigation}) => {
    const [search,setSearch]=useState('');
   
  return (
    <View>
         <StatusBar  barStyle="light-content" translucent={true} backgroundColor={Color.maincolor}/>
        <TouchableOpacity style={styles.invoicebtn} onPress={(e)=> navigation.navigate("createinvoice")}>
            <Text style={styles.invoiceBtnText}>Create Invoice</Text>
        </TouchableOpacity>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(value) => setSearch(value)}
          value={search} round
      
          containerStyle={{
            backgroundColor: 'transparent', 
            borderBottomColor: 'transparent', 
            borderTopColor: 'transparent',
            paddingHorizontal:10,
            
          }}
          inputContainerStyle={{
            backgroundColor: Color.whitecolor, 
            borderRadius: 10,
            height: 50, 
            width:"100%",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5, 
            
          }}
          inputStyle={{
            color: '#000',
          }}
          placeholderTextColor="#999" 
     
        />
     <ScrollView style={styles.scrollview}>
     <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>TB200110003</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>TB200110003</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>TB200110003</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>TB200110003</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>TB200110003</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>TB200110003</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>TB200110003</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>TB200110003</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>TB200110003</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>TB200110003</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>TB200110003</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>TB200110003</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Mainview}  onPress={(e) => navigation.navigate('cargoview')}>
        <Text style={styles.invoiceBtnText}>Last</Text>
      </TouchableOpacity>
     </ScrollView>
      
    </View>
  )
}
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    Mainview:{
        backgroundColor:Color.maincolor,
        marginHorizontal:30,
        height:55,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        marginVertical:5,
    },
    invoicebtn:{
        backgroundColor:Color.Green,
        height:45,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:25,
        marginHorizontal:45,
        borderRadius:15,
    },
    invoiceBtnText:{
        color:Color.whitecolor,
        fontWeight:"900"
    },
    scrollview:{
        marginVertical:45,
        maxHeight: windowHeight/1.5, 
    },

})
export default Cargolist
