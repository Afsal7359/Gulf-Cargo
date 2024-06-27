import { StatusBar, StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Color from '../../Components/Color';
import { Picker } from '@react-native-picker/picker';

const Createinvoice = ({navigation}) => {

    const [District,setDistrict]=useState('')

    onPaymentStepComplete = () => {
        alert('Payment step completed!');
        setDistrict('')
      };

  return (
    <View style={{flex: 1}}>
        <StatusBar  barStyle="light-content" translucent={false} backgroundColor={Color.maincolor}/>
    <ProgressSteps>
        <ProgressStep label="Basic Info">
            <View style={styles.basicInfoView}>
                <TextInput placeholder='Booking No' style={styles.textinput}/>
                <TextInput placeholder='Branch List' style={styles.textinput}/>
            </View>
        </ProgressStep>
        <ProgressStep label="Sender Info">
          <View style={styles.basicInfoView}>
                <TouchableOpacity style={styles.cstAddbtn} onPress={(e)=> navigation.navigate("Addcustomer")}>
                    <Text style={styles.text}>Create Customer</Text>
                </TouchableOpacity>
                 <TextInput placeholder='Select Customer' style={styles.textinput}/>
                 <TextInput placeholder=' Address' style={styles.textinput}/>
                 <TextInput placeholder='Phone' style={styles.textinput}/>
            </View>
        </ProgressStep>
        <ProgressStep label="Reciever Info">
        <View style={styles.basicInfoView}>
                <TouchableOpacity style={styles.cstAddbtn}>
                    <Text style={styles.text}>Create Customer</Text>
                </TouchableOpacity>
                 <TextInput placeholder='Select Customer' style={styles.textinput}/>
                 <TextInput placeholder=' Address' style={styles.textinput}/>
                 <TextInput placeholder='Phone' style={styles.textinput}/>
            </View>
        </ProgressStep>
        <ProgressStep label="Shipping Info" onSubmit={this.onPaymentStepComplete}>
            <View>
            <View style={styles.pickerView}>
                <Picker style={{color:Color.Black}}  >
                    <Picker.Item label="Select Courier Company" />
                    <Picker.Item label="Kannur" value="option2" />
                    <Picker.Item label="Kasargod" value="option3" />
                </Picker>
            </View>
            <View style={styles.pickerView}>
                <Picker style={{color:Color.Black}}  >
                    <Picker.Item label="Select Shiping Methods" />
                    <Picker.Item label="Kannur" value="option2" />
                    <Picker.Item label="Kasargod" value="option3" />
                </Picker>
            </View>
            <View style={styles.pickerView}>
                <Picker style={{color:Color.Black}}  >
                    <Picker.Item label="Select Payment Method" />
                    <Picker.Item label="Kannur" value="option2" />
                    <Picker.Item label="Kasargod" value="option3" />
                </Picker>
            </View>
            <View style={styles.pickerView}>
                <Picker style={{color:Color.Black}}  >
                    <Picker.Item label="Select Status" />
                    <Picker.Item label="Kannur" value="option2" />
                    <Picker.Item label="Kasargod" value="option3" />
                </Picker>
            </View>
            <TextInput placeholder='Date' style={styles.textinput}/>
            <View style={styles.pickerView}>
                <Picker style={{color:Color.Black}}  >
                    <Picker.Item label="Select Collect By" />
                    <Picker.Item label="Kannur" value="option2" />
                    <Picker.Item label="Kasargod" value="option3" />
                </Picker>
            </View>
            <View style={styles.pickerView}>
                <Picker style={{color:Color.Black}}  >
                    <Picker.Item label="Select Name" />
                    <Picker.Item label="Kannur" value="option2" />
                    <Picker.Item label="Kasargod" value="option3" />
                </Picker>
            </View>
            <TextInput placeholder='LRL Tracking Code' style={styles.textinput}/>
            <View style={styles.pickerView}>
                <Picker style={{color:Color.Black}}  >
                    <Picker.Item label="Select Delivery Type" />
                    <Picker.Item label="Kannur" value="option2" />
                    <Picker.Item label="Kasargod" value="option3" />
                </Picker>
            </View>
            <TextInput placeholder='Time' style={styles.textinput}/>
            </View>
        
        </ProgressStep>
        
    </ProgressSteps>
</View>
  )
}

export default Createinvoice

const styles = StyleSheet.create({
    textinput:{
        height:45,
        width:"100",
        marginHorizontal:45,
        marginVertical:20,
        borderColor: Color.maincolor,
        borderWidth:2,
        borderRadius:10,
        paddingLeft:25,
    },
    basicInfoView:{
        justifyContent:"center",
        marginVertical:100,
    },
    pickerView:{
        borderWidth: 2,
        borderColor: Color.maincolor,
        borderRadius: 10,
        overflow: 'hidden',
        margin: 10,
        height:45,
        marginHorizontal:45,
        justifyContent:"center",
        fontStyle:"italic",
      },
      cstAddbtn:{
        backgroundColor:Color.maincolor,
        width:"100",
        height:45,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
        marginHorizontal:85,
        marginVertical:15,
      },
      text:{
        color:Color.whitecolor,
        fontWeight:"900"
    },
      
})