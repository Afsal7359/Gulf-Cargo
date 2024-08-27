import { ActivityIndicator, Dimensions, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Color from '../../Components/Color';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GetTracking } from '../../Api/Tracking';

const statusOrder = [
  "Enquiry collected",
  "Shipment booked",
  "Shipment received",
  "Shipment forwarded",
  "Shipment arrived",
  "Waiting for clearance",
  "Shipment cleared",
  "Out for Delivery",
  "Delivery arranged",
];

const conditionalStatuses = [
  { primary: "Waiting for clearance", secondary: "Shipment on hold" },
  { primary: "Out for Delivery", secondary: "Pending" },
  { primary: "Delivery arranged", secondary: "Not Delivered" }
];

const TrackingSearch = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const { width } = Dimensions.get('window');
  const [trackdata, setTrackData] = useState([]);
  const [loading,setLoading]=useState(false)

  const handleTrackPress = async () => {
    try {
      setLoading(true)
      const response = await GetTracking({ booking_no: search });
      if (response.success) {
        setTrackData(response.data);
        setLoading(false)
        ToastAndroid.show("Tracking Data Fetched Successfully", ToastAndroid.SHORT);
        
      } else {
        setLoading(false)
        ToastAndroid.show(response.message, ToastAndroid.LONG);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
   <>  
   {loading?(
    <View style={styles.loader}>
       <ActivityIndicator  size={65} color={Color.maincolor} style={{position:"absolute", top:300,left:165}}/>
    </View>
   ):(<ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" translucent={false} backgroundColor={Color.maincolor} />
      <View style={styles.SearchView}>
        <SearchBar
          placeholder="Enter Your Invoice Number"
          onChangeText={(value) => setSearch(value)}
          value={search} round
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            paddingHorizontal: 10,
          }}
          inputContainerStyle={{
            backgroundColor: Color.whitecolor,
            borderRadius: 10,
            height: 50,
            width: width * 0.72,
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
          onSubmitEditing={handleTrackPress}
        />
        <TouchableOpacity style={styles.Trackbtn} onPress={handleTrackPress}>
          <Text style={styles.Tracktext}>Track</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.containers}>
          {trackdata.map((item, index) => {
            const completedStatuses = item.statuses.map(status => status.status.trim());
            let latestCompletedIndex = -1;

            completedStatuses.forEach(status => {
              const currentIndex = statusOrder.indexOf(status);
              if (currentIndex > latestCompletedIndex) {
                latestCompletedIndex = currentIndex;
              }
            });

            return (
              <View key={index} style={{backgroundColor:Color.maincolor}}>
                <View style={styles.topView}>
                  <View style={styles.topsubView}>
                    <Text style={styles.toptext}>Box Number: {item.box_names}</Text>
                  </View>
                </View>
                {statusOrder.map((status, statusIndex) => {
                  let isStatusVisible = true;

                  for (const { primary, secondary } of conditionalStatuses) {
                    if (status === primary && completedStatuses.includes(secondary)) {
                      isStatusVisible = false;
                      break;
                    }
                  }

                  if (isStatusVisible) {
                    const isCompleted = statusIndex <= latestCompletedIndex;
                    const matchingStatus = item.statuses.find(s => s.status.trim() === status);
                    return (
                      <View style={styles.item} key={statusIndex}>
                        <View style={styles.dateContainer}>
                          <Text style={styles.date}>{matchingStatus ? matchingStatus.date : ''}</Text>
                        </View>
                        <View style={styles.timelineContainer}>
                          <View style={styles.iconContainer}>
                          {isCompleted ? (
                              <View style={styles.iconWrapper}>
                                <Icon name="check" size={24} color={Color.Green} />
                              </View>
                            ) : (
                              <View style={styles.iconWrapper}>
                                <Icon name="hourglass-o" size={24} color={Color.Grey} />
                              </View>
                            )}
                            {statusIndex < statusOrder.length - 1 && <View style={[styles.dottedLine, { borderColor: isCompleted ? Color.Green : Color.Grey }]} />}
                          </View>
                          <View style={styles.textContainer}>
                            <Text style={styles.title}>{status}</Text>
                            <Text style={styles.address}>{matchingStatus && matchingStatus.comment ? matchingStatus.comment : ""}</Text>
                            <Text style={styles.time}>{matchingStatus ? matchingStatus.time : ''}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  }

                  return null;
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>)}
    </>
  )
}

export default TrackingSearch

const styles = StyleSheet.create({
  iconWrapper: {
    borderWidth: 2, // Width of the border
    borderColor: Color.Green, // Color of the border
    borderRadius: 24, // Half of the width/height to make it a circle
    width: 40, // Width of the circle
    height: 40, // Height of the circle
    alignItems: 'center', // Center the icon horizontally
    justifyContent: 'center', // Center the icon vertically
    backgroundColor:Color.whitecolor,

  },
  containers: {
    backgroundColor: Color.whitecolor,
    flex: 1,
  },
  SearchView: {
    flexDirection: "row",
    alignItems: "center",
  },
  Trackbtn: {
    backgroundColor: Color.maincolor,
    padding: 15,
    borderRadius: 10,
  },
  Tracktext: {
    color: Color.whitecolor
  },
  topView: {
    height: 145,
    backgroundColor: "#fff",
    borderRadius:15,
    backgroundColor:Color.whitecolor
  },
  toptext: {
    fontSize: 19,
    fontWeight: "900",
    backgroundColor: Color.maincolor,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    color: Color.whitecolor
  },
  topsubView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 20,
    
  },
  dateContainer: {
    width: 100,
    alignItems: 'center',
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Color.whitecolor
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
    borderStyle: 'solid',
    position: 'absolute',
    top: 39,
    left: 11,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.whitecolor
  },
  address: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
    color: Color.whitecolor
  },
  time: {
    fontSize: 12,
    color: Color.whitecolor
  },
  container: {
    flex: 1,
  },
});
