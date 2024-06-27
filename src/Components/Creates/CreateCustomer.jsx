import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Color from '../Color'

const CreateCustomer = () => {
  return (
    <ScrollView>
       <TextInput placeholder='Select Customer' style={styles.textinput}/>
       <TextInput placeholder='Select Customer' style={styles.textinput}/>
       <TextInput placeholder='Select Customer' style={styles.textinput}/>
       <TextInput placeholder='Select Customer' style={styles.textinput}/>
       <TextInput placeholder='Select Customer' style={styles.textinput}/>
       <TextInput placeholder='Select Customer' style={styles.textinput}/>
       <TextInput placeholder='Select Customer' style={styles.textinput}/>
       <TextInput placeholder='Select Customer' style={styles.textinput}/>
       <TextInput placeholder='Select Customer' style={styles.textinput}/>
       <TextInput placeholder='Select Customer' style={styles.textinput}/>
       <TextInput placeholder='Select Customer' style={styles.textinput}/>
       <TextInput placeholder='Select Customer' style={styles.textinput}/>
    </ScrollView>
  )
}

export default CreateCustomer

const styles = StyleSheet.create({
  textinput:{
    height:45,
    width:"100",
    marginHorizontal:45,
    marginVertical:10,
    borderColor: Color.maincolor,
    borderWidth:2,
    borderRadius:10,
    paddingLeft:25,
},
})