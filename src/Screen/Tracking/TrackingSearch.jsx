import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Color from '../../Components/Color';
import { useState } from 'react';
import { SearchBar } from 'react-native-elements';

const TrackingSearch = ({navigation}) => {
    const [search,setSearch]=useState('');
    const data = [
        {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          }, {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
          {
            number: 'KBFC65646467',
          },
       
      ];
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" translucent={false} backgroundColor={Color.maincolor} />
        <View>
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
        </View>
        {data.map((item,index)=>(
            <TouchableOpacity key={index} style={styles.Mainview} onPress={() => navigation.navigate("Tracking")}>
                <Text style={styles.NumberText}>{item.number}</Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
  )
}

export default TrackingSearch

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    Mainview:{
        flexDirection:'row',
        height:55,
        backgroundColor:Color.maincolor,
        justifyContent:'center',
        alignItems:"center",
        marginVertical:10,
        marginHorizontal:20,
        borderRadius:10,
    },
    NumberText:{
        color:Color.whitecolor,
        fontSize:15,
        fontWeight:"700"

    },
})