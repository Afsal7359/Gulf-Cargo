import { Image, StyleSheet,StatusBar, Text, View,TouchableOpacity, ToastAndroid, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../../Components/Color'
import Backicon from '../../../assets/imagesS/back.png'
import AddIcon from '../../../assets/imagesS/addicon.png'
import { GetAllReciever } from '../../Api/Invoice'
import CreateReciever from '../../Components/Modal/CreateReciever'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Reciever = ({navigation}) => {
    const [modal,setModal]=useState(false);
    const [Data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        RecieverDataFetch();
    },[])

    const RecieverDataFetch = async()=>{
        try {
            setLoading(true)
            const response = await GetAllReciever();
            if(response.success){
                console.log(response,"succ");
                setData(response.data)
                setLoading(false)
            }else{
                console.log(response,"err");
                ToastAndroid.show(`${response.message}`,ToastAndroid.LONG);
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show('Network Problem ',ToastAndroid.LONG);
        }
    }
  return (
    <View>
         <StatusBar  barStyle="light-content" translucent={false} backgroundColor={Color.maincolor}/>
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <Text style={styles.headerBackText}>Back</Text> */}
          <Image source={Backicon} style={{height:35,width:35}}/>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => setModal(true)}>
        <Image source={AddIcon} style={{height:40,width:40}}/>
        </TouchableOpacity>
       
      </View>
       {loading ? (
        <View>
             <ActivityIndicator  size={65} color={Color.maincolor} style={{position:"absolute", top:200,left:165}}/>
        </View>
       ):(   
       <ScrollView>
      <View style={styles.container}>
        {Data.map((item,index)=>(
            <View style={styles.mainview} key={index}>
            <View style={styles.textView}>
                <Text style={styles.text}>Name</Text>
                <Text style={styles.text}>: {item?.name}</Text>
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>Email</Text>
                <Text style={styles.text}>: {item?.email}</Text>
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>Phone</Text>
                <Text style={styles.text}>: {item?.country_code_phone}.{ item?.phone}</Text>
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>Whatsapp Number</Text>
                <Text style={styles.text}>: {item?.country_code_whatsapp}.{ item?.whatsapp_number}</Text>
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>Address</Text>
                <Text style={styles.text}>: {item?.address?.address} , { item?.address?.zip_code}</Text>
            </View>
            </View>
        ))}
      
      </View>
      </ScrollView>)}
      {modal&& <CreateReciever navigation={navigation} setModal={setModal} datafetch={RecieverDataFetch}/>}
    </View>
  )
}

export default Reciever

const styles = StyleSheet.create({
    container:{
        flex:1,
         padding:20,
         marginBottom:55
    },
    mainview:{
        height:"auto",
        width:0.9*windowWidth,
        backgroundColor:Color.maincolor,
        marginVertical:5,
        borderRadius:15,
        padding:15,
        paddingVertical:20,
    },
    textView:{
        flexDirection:"row",
        justifyContent:"space-around",
        paddingVertical:8,
      
    },
    text:{
        color:Color.whitecolor,
        fontWeight:"600",
        fontSize:14,
        width:0.4* windowWidth
    },
    header: {
        height: 65,
        backgroundColor: Color.maincolor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between",
        paddingHorizontal: 15,
      },
      headerBackText: {
        color: '#fff',
        fontSize: 18,
      },
      headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
      },
})