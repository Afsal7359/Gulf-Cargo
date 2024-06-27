import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../../Components/Color'
import Icon from 'react-native-vector-icons/FontAwesome';


const Tracking = () => {
    const data = [
        {
            date: '14/07/2023',
            title: 'Enquiry Collected',
            address: 'Airport Main Rd, Amarjeet Nagar',
            time: '07:22 AM',
            icon: 'check',
          },
        {
          date: '34/07/2023',
          title: 'Shipment Received',
          address: 'Airport Main Rd, Amarjeet Nagar',
          time: '07:22 AM',
          icon: 'check',
        },
        {
            date: '42/07/2023',
            title: 'Shipment Booked',
            address: 'Real Prime Bapa Sitaram Chowk',
            time: '10:56 PM',
            icon: 'check',
          },
        {
          date: '41/07/2023',
          title: 'Shipment forwarded',
          address: 'Real Prime Bapa Sitaram Chowk',
          time: '10:56 PM',
          icon: 'check',
        },
        {
            date: ' 24/07/2023',
            title: 'Shipment arrived',
            address: 'Real Prime Bapa Sitaram Chowk',
            time: '10:56 PM',
            icon: 'check',
          },
          {
            date: '54/07/2023',
            title: 'Waiting for clearance',
            address: 'Real Prime Bapa Sitaram Chowk',
            time: '10:56 PM',
            icon: 'check',
          },
        {
          date: '74/07/2023',
          title: 'Out for Delivery',
          address: 'Airport Main Rd, Khandheri',
          time: '03:22 AM',
          icon: 'check',
        },
        {
            date: ' 24/07/2023',
            title: 'Delivered',
            address: 'Airport Main Rd, Khandheri',
            time: '03:22 AM',
            icon: 'check',
          },
      ];
    
  
  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" translucent={false} backgroundColor={Color.maincolor} />
        <View style={styles.topView}>
            <View style={styles.topsubView}>
                <Text style={styles.toptext}>TB200110002700</Text>
                <Text style={styles.toptext2}>Status : Delivered</Text>
                <Text style={styles.toptext2}>17/06/2023</Text>
            </View>
        </View>
        <ScrollView style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View style={styles.timelineContainer}>
            <View style={styles.iconContainer}>
              <Icon name={item.icon} size={24} color={Color.Green} />
              {index < data.length - 1 && <View style={styles.dottedLine} />}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.address}>{item.address}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
    </View>
  )
}

export default Tracking

const styles = StyleSheet.create({
    container:{
        backgroundColor:Color.maincolor,
        flex:1,
    },
    topView:{
        height:145,
        backgroundColor:"#fff",
        borderBottomEndRadius:55,
        borderBottomLeftRadius:55,
    },
    toptext:{
        fontSize:19,
        fontWeight:"900",
        backgroundColor:Color.maincolor,
        borderRadius:10,
        marginVertical:10,
        padding:10,
        color:Color.whitecolor
    },
    toptext2:{
        fontSize:17,
        fontWeight:"400",
    },
    topsubView:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
       
       
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginVertical:20,
      },
      dateContainer: {
        width: 100,
        alignItems: 'center',
      },
      date: {
        fontSize: 15,
        fontWeight: 'bold',
        color:Color.whitecolor
      },
      timelineContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      iconContainer: {
        alignItems: 'center',
        marginRight: 20,
        width: 30,
      },
      dottedLine: {
        width: 1,
        height: '170%',
        borderWidth: 2,
        borderColor: Color.Green,
        borderStyle: 'dotted',
        position: 'absolute',
        top: 30,
        left: 11,
      },
   
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        color:Color.whitecolor
      },
      address: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5,
        color:Color.whitecolor
      },
      time: {
        fontSize: 12,
        color: Color.whitecolor,
        color:Color.whitecolor
      },
})