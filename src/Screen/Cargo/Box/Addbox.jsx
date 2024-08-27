import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  Image
} from 'react-native';
import Color from '../../../Components/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateBox, GetBoxes } from '../../../Api/box';
import { Toast } from 'toastify-react-native';
import DeleteIcon from '../../../../assets/Images/deleteicon.png'
import AddIcon from '../../../../assets/imagesS/addicon.png'
import BackIcon from '../../../../assets/imagesS/back.png'
import TickIcon from '../../../../assets/Images/tickicon1.png'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Addbox = ({ route, navigation }) => {
  const { id, data } = route.params;
  const [items, setItems] = useState([{ description: '', quantity: '', unit_price: '', subtotal: 0 }]);
  const [boxWeight, setBoxWeight] = useState('');
  const scrollViewRef = useRef();
  const [boxdata,setBoxData]=useState([]);
  const [boxnumber,setBoxNumber]=useState(0)

  const addItem = () => {
    setItems([...items, { description: '', quantity: '', unit_price: '', subtotal: 0 }]);
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 100);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };
  useEffect(()=>{
    BoxDataFetch();
  },[])
  const BoxDataFetch= async()=>{
    try {
        const response = await GetBoxes(data);
        if(response.success){
            console.log(response.data,"response");
            setBoxData(response.data)
            const transformedData = response.data.map(boxdata => ({
                booking_number: boxdata.booking_number,
                boxlength: boxdata.boxes ? boxdata.boxes.length : 0,
              }));
             setBoxNumber(`${(transformedData[0].boxlength+1)}${transformedData[0].booking_number}`);
        }else{
            console.log(response);
            ToastAndroid.show(`${response.message}`,ToastAndroid.LONG)
        }
    } catch (error) {
        console.log(error);
        ToastAndroid.show("Network Error !!",ToastAndroid.LONG)
    }
}
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    const quantity = Number(newItems[index].quantity || 0);
    const itemValue = Number(newItems[index].unit_price || 0);
    newItems[index].subtotal = quantity * itemValue;
    setItems(newItems);
  };

  const calculateTotal = () => {
    const totalQuantity = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const totalValue = items.reduce((sum, item) => sum + item.subtotal, 0);
    return { totalQuantity, totalValue };
  };

  const handleSave = async () => {
    for (let i = 0; i < items.length; i++) {
      if (!items[i].description || !items[i].quantity || !items[i].unit_price) {
        Alert.alert("Error", "All fields must be filled for each item.");
        return;
      }
    }
    if (!boxWeight) {
      Alert.alert("Error", "Box weight must be filled.");
      return;
    }

    const userInfoString = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoString);
    const branch_id = userInfo?.branch_id;

    const FormDatas = {
      box_name: boxnumber,
      shipment_id: id,
      weight: boxWeight,
      branch_id: branch_id,
      packages: items,
    };
    Alert.alert(
      "Confirm Save",
      "Are you sure you want to save this box?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Save Cancelled"), // Action if user cancels
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: async () => {
            const response = await CreateBox(FormDatas);
            if (response.success) {
              BoxDataFetch();
              setBoxWeight('');
              setItems([{ description: '', quantity: '', unit_price: '', subtotal: 0 }])
              Toast.success('Boxes Added Successfully');
              navigation.navigate('addbox', {id:id,data:data });
            } else {
              console.log(response, "error");
            }
          } 
        }
      ],
      { cancelable: false }
    );
 
   
  };

  const { totalQuantity, totalValue } = calculateTotal();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
         {/* Custom Header */}
         <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('cargoview', { data: data })}>
          {/* <Text style={styles.headerBackText}>Back</Text> */}
          <Image source={BackIcon} style={{height:35,width:35}}/>
        </TouchableOpacity>
        <Text style={{color:Color.whitecolor,fontSize:20,fontWeight:"900"}}>Add Box</Text>
        <View style={styles.btnview}>
        <TouchableOpacity onPress={addItem} style={styles.addbtnss}>
        <Image source={AddIcon}  style={{height:40,width:40}}/>
        </TouchableOpacity>
        <TouchableOpacity  onPress={handleSave}>
        <Image source={TickIcon}  style={{height:35,width:35,marginTop:2}}/>
        </TouchableOpacity>
        </View>
       
       
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
         <View style={styles.boxweiMainContainer}>
        <View style={styles.weightContainer}>
          <Text style={styles.label}>Box</Text>
          <TextInput
            style={styles.input}
            value={boxnumber}
            editable={false}
          />
        </View>
        <View style={styles.weightContainer}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            value={boxWeight}
            onChangeText={setBoxWeight}
            keyboardType="numeric"
          />
        </View>
        </View>

        {items.map((item, index) => {
          const quantity = Number(item.quantity || 0);
          const value = Number(item.unit_price || 0);
          const subtotal = quantity * value;

          return (
            <View style={styles.row} key={index}>
              <TextInput
                placeholder='descri..'
                style={styles.input1}
                value={item.description}
                onChangeText={(text) => updateItem(index, 'description', text)}
              />
              <TextInput
                placeholder='quantity'
                style={styles.input1}
                value={item.quantity}
                onChangeText={(text) => updateItem(index, 'quantity', text)}
                keyboardType="numeric"
              />
              <TextInput
                placeholder='value'
                style={styles.input1}
                value={item.unit_price}
                onChangeText={(text) => updateItem(index, 'unit_price', text)}
                keyboardType="numeric"
              />
              <Text style={styles.fixedValue}>{subtotal}</Text>
              <TouchableOpacity onPress={() => removeItem(index)}>
                {/* <Text style={styles.removeButton}>X</Text> */}
                <Image source={DeleteIcon} style={{height:19,width:19}}/>
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Quantity: {totalQuantity}</Text>
          <Text style={styles.totalText}>Total Value: {totalValue}</Text>
        </View>
        {/* <View style={styles.buttonContainer}>
          <Button title="Add Items" onPress={addItem} color="green" />

        </View> */}
        {/* <View style={styles.savebtnview}>
          <TouchableOpacity style={styles.savebtn} onPress={handleSave}>
            <Text style={{ justifyContent: "center", color: Color.whitecolor, textAlign: "center" }}>Save</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flexGrow: 1,
  },
  addbtnss:{
    marginHorizontal:25,
  },
  btnview:{
    flexDirection: 'row',
    
  },
  header: {
    height: 60,
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
  savebtn: {
    backgroundColor: Color.maincolor,
    padding: 15,
    marginVertical: 25,
    width: 200,
    borderRadius: 15,
  },
  savebtnview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxweiMainContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  weightContainer: {
    marginVertical: 10,
    width:0.4* windowWidth,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius:10,
    padding: 8,
    margin: 5,
    color:Color.Black,
  },
  input1: {
    borderBottomWidth: 1,
    // borderRadius:10,
    borderColor:Color.maincolor,
    padding: 8,
    margin: 5,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderColor:Color.light,
    borderWidth:2,
    padding:15,
    borderRadius:10,
  },
  fixedValue: {
    width: 50,
    textAlign: 'center',
  },
  removeButton: {
    color: 'red',
    marginLeft: 10,
    fontSize: 18,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Addbox;
