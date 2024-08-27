import { StatusBar, StyleSheet, Text, TextInput,Alert , View,TouchableOpacity, ToastAndroid, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Color from '../../Components/Color';
import { Picker } from '@react-native-picker/picker';
import CreateCustomer from '../../Components/Modal/CreateCustomer';
import { checkTokenAndProceed } from '../../Components/Tokencheck/TockenCheck';
import CreateReciever from '../../Components/Modal/CreateReciever';
import { CreateInvoice, EditInvoiceApi, GetAllCollectedBy, GetAllCourierCompany, GetAllReciever, GetAllsender, GetBookingNumber, GetBranchList, GetDriversByBranchId, GetPaymentMethod, GetShippingMethod, GetStaffByBranchId, GetStatusData } from '../../Api/Invoice';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Toast } from 'toastify-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddIcon from '../../../assets/imagesS/addicon.png'

const Editinvoice = ({navigation,route}) => {
  const { data,id } = route.params;
  console.log(data,"routre");
  
  const [branch,setBranch]=useState();
    useEffect(()=>{
        checkTokenAndProceed(navigation)
       
      },[])
    const [District,setDistrict]=useState('')
    const [modal,setModal]=useState(false);
    const [recieverModal,setRecieverModal]=useState(false)
    const [hasErrors, setHasErrors] = useState(false);
    const [has2Errors,setHas2Error]=useState(false)
    const [branchList,setBranchList]=useState([])
    const [sender,setSender]=useState([]);
    const [reciever,setReciever]=useState([]);
    const [courier,setCourier]=useState([]);
    const [shippingMethod,setShippingMethod]=useState([]);
    const [paymentMethod,setPaymentMethod]=useState([]);
    const [status,setStatus]=useState([]);
    const [collectBy,setCollectedBy]=useState([]);
    const [user,setUser]=useState([]);  
    const [checkuser,setcheckuser]=useState("")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [date,setDate]=useState(data?.collection_details?.shiping_date);
    const [time,setTime]=useState(data?.time);

      const [formData, setFormData] = useState({
        bookingNo: data?.collection_details?.booking_no,
        branchList: '',
        valueOfGoods:data?.value_of_goods,
        selectSender: data?.sender?.id,
        senderAddress: data?.sender?.address,
        senderPhone: data?.sender?.phone,
        selectCustomer: data?.reciver?.id,
        customerAddress:data?.reciver?.address,
        customerPhone: data?.reciver?.phone,
        courierCompany:data?.agency_id,
        shippingMethod:  data?.shipping_method_id,
        paymentMethod: data?.payment_method,
        status: data?.status_id,
        date: data?.collection_details?.shiping_date,
        collectBy: data?.collected_by,
        name:data?.other_details?.staff,
        trackingCode: '',
        deliveryType: data?.delivery_type,
        specialRemark:data?.special_remarks,
        time: data?.time,
        userid: data?.staff_id !== null ? data?.staff_id: data?.driver_id !== null ? data?.driver_id:""
      });

      const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
      const showTimePicker = () => {
        setTimePickerVisibility(true);
      };
    
      const hideTimePicker = () => {
        setTimePickerVisibility(false);
      };
      const handleConfirmTime = (time) => {
        setFormData({ 
          ...formData,
          time: moment(time).format('HH:mm') });
          setTime(moment(time).format('HH:mm'))
        hideTimePicker();
      };
      const handleConfirm = (date) => {
        setFormData({ 
          ...formData,
          date: moment(date).format('YYYY-MM-DD') });
          setDate(moment(date).format('YYYY-MM-DD'));
        hideDatePicker();
      };
      const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
      };
      useEffect(()=>{
        if (data?.driver_id === null) {
          setcheckuser("driver");
        } else if (data?.driver_id === null) {
          setcheckuser('staff');
        }
      },[])
      // useEffect(() => {
      //   const today = new Date();
      //   const formattedDate = today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD' 
      //   const formattedTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as 'HH:MM'
      //   // setFormData({ 
      //   //   ...formData,
      //   //   date: formattedDate,
      //   //   time:formattedTime,
      //   //   status:15,
      //   //  });
    
      //     setDate(formattedDate);
      //     setTime(formattedTime);              
      // }, []);
      const validateBasicInfo = () => {
        const { bookingNo } = formData;
        if (!bookingNo ) {
            Alert.alert('Error', 'Please fill in all fields in the Basic Info step.');
            setHasErrors(true); 
            return false; // Set error state
        } else {
            setHasErrors(false); 
            SenderCustomerfetch();
            RecieverCustomerfetch();
            return true;// Clear error state
        }
    };
    
    const validateSenderInfo = () => {
      const { selectSender, senderAddress, senderPhone,selectCustomer, customerAddress, customerPhone } = formData;
      if (!selectSender || !senderAddress || !senderPhone || !selectCustomer || !customerAddress || !customerPhone) {
          Alert.alert('Error', 'Please fill in all fields in the Customer Info step.');
          setHas2Error(true);
          return false;  // Prevent navigation
      }
      setHas2Error(false);
      // RecieverCustomerfetch();
      CourierCompanyFetch();
      ShippingMethodFetch();
      PaymentMethodFetch();
      StatusDataFetch();
      CollectedByDataFetch();
      return true;  // Allow navigation
  };
  
    
      // const validateRecieverInfo = () => {
      //   const { selectCustomer, customerAddress, customerPhone } = formData;
      //   if (!selectCustomer || !customerAddress || !customerPhone) {
      //     Alert.alert(' Error', 'Please fill in all fields in the Reciever Info step.');
      //     setHasErrors(true);
      //     return false
      //   }
      //   setHasErrors(false);
      //   CourierCompanyFetch();
      //   ShippingMethodFetch();
      //   PaymentMethodFetch();
      //   StatusDataFetch();
      //   CollectedByDataFetch();
      //   return true;
      // };
    
      const validateShippingInfo = () => {
        const { courierCompany, shippingMethod, paymentMethod, status,  collectBy, name, deliveryType,  } = formData;
        if (!courierCompany  || !shippingMethod || !paymentMethod || !status  || !collectBy || !name  || !deliveryType ) {
          Alert.alert(' Error', 'Please fill in all fields in the Shipping Info step.');
          setHasErrors(true);
          return false;
        }
        setHasErrors(false);
        return true;
      };
      const onPaymentStepComplete = async() => {
        if (validateShippingInfo()) {
          // Alert.alert('Success', 'All steps completed successfully!');
          const userInfoString = await AsyncStorage.getItem('userInfo');
          const userInfo = JSON.parse(userInfoString);
          const branch_id = userInfo?.branch_id; 
          const FormsData={
            invId:id,
            new_book_no:formData.bookingNo,
            booking_number:formData.bookingNo,
            sender_id:formData.selectSender,
            receiver_id:formData.selectCustomer,
            agency_id:formData.courierCompany,
            shipping_method_id:formData.shippingMethod,
            created_date:formData.date,
            payment_method:formData.paymentMethod,
            status_id:formData.status,
            collected_by:formData.collectBy,
            delivery_type:formData.deliveryType,
            time:time,
            value_of_goods:formData.valueOfGoods,
            special_remarks:formData.specialRemark,
            branch_id:branch_id,
          }
          if (checkuser === "driver") {
            FormsData.driver_id = formData.userid;
          } else if (checkuser === "staff") {
            FormsData.staff_id = formData.userid;
          }
          console.log(FormsData,"gggggggggggggggg");
          const response = await EditInvoiceApi(FormsData);
          if(response.success){
            Toast.success("Invoice Updated Successfully");
            console.log(response);
            navigation.navigate("home")
          }else{
            Toast.error(`${response.message}`);
            console.log(response,"res-err");
            
          }
        }
       
        console.log(formData,"formdaya");
        
        
      };
      const handleSenderChange = (value) => {
        const selectedSender = sender.find(item => item.id === value);
        setFormData({
            ...formData,  // Keep existing form data
            selectSender: value,
            senderAddress: selectedSender?.address.address || '',
            senderPhone: selectedSender?.phone || ''
        });
    };
    
    const handleRecieverChange = (value) => {
        const selectedReciever = reciever.find(item => item.id === value);
        setFormData({
            ...formData,  // Keep existing form data
            selectCustomer: value,
            customerAddress: selectedReciever?.address.address || '',
            customerPhone: selectedReciever?.phone || ''
        });
    };
    

      useEffect(()=>{
        // BookingNumberFetch();
        BranchListFetch();
        branchData();
      },[])
      const branchData = async()=>{
        try {
          const userInfoString =await AsyncStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoString);
        const branch_name = userInfo?.branch_name;
        setBranch(branch_name)
        } catch (error) {
          ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
        }
      }
      // const BookingNumberFetch=async()=>{
      //   try {
      //     const response = await GetBookingNumber();
      //     if(response.success){
           
      //       handleInputChange('bookingNo',response.data.nextBookingNumber)
      //     }else{
      //       console.log(response);
      //      ToastAndroid.show('Error', 'Failed to fetch booking number',ToastAndroid.LONG);
      //     }
      //   } catch (error) {
      //     console.log(error);
      //     ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
      //   }
      // }
      const BranchListFetch=async()=>{
        try {
          const response= await GetBranchList();
          if(response){
            setBranchList(response.data);
          }else{
            console.log(response);
            // ToastAndroid.show(`${response.message}`, ToastAndroid.LONG); 
          }
        } catch (error) {
          console.log(error);
          ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
        }
      }
      const SenderCustomerfetch = async()=>{
        try {
          const response = await GetAllsender();
          if(response.success){
           
            setSender(response.data)
          }else{
            console.log(response);
            ToastAndroid.show(`${response.message}`,ToastAndroid.LONG)
          }
        } catch (error) {
          console.log(error);
          ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
        }
      }
      const RecieverCustomerfetch = async()=>{
        try {
          const response = await GetAllReciever();
          if(response.success){
           
            setReciever(response.data)
          }else{
            console.log(response);
            ToastAndroid.show(`${response.message}`,ToastAndroid.LONG)
          }
        } catch (error) {
          console.log(error);
          ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
        }
      }
      const CourierCompanyFetch = async()=>{
        try {
          const response = await GetAllCourierCompany();
          if(response.success){
           
            setCourier(response.data);
          }else{
            console.log(response,"err-res");
          }
        } catch (error) {
          console.log(error);
          ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
        }
      }
      const ShippingMethodFetch = async()=>{
        try {
          const response = await GetShippingMethod();
          if(response.success){
           
            setShippingMethod(response.data);
          }else{
            console.log(response,"err-res");
          }
        } catch (error) {
          console.log(error);
          ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
        }
      }
      const PaymentMethodFetch = async()=>{
        try {
          const response = await GetPaymentMethod();
          if(response.success){
           
            setPaymentMethod(response.data)
          }else{
            ToastAndroid.show(`${response.message}`, ToastAndroid.LONG);
          }
        } catch (error) {
          console.log(error);
          ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
        }
      }
      const StatusDataFetch = async()=>{
        try {
          const response = await GetStatusData();
          if(response.success){
           
            setStatus(response.data)
          }else{
            ToastAndroid.show(`${response.message}`, ToastAndroid.LONG);
          }
        } catch (error) {
          console.log(error);
          ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
        }
      }
      const CollectedByDataFetch = async()=>{
        try {
          const response = await GetAllCollectedBy();
          if(response){
           
            setCollectedBy(response.data)
          }else{
            ToastAndroid.show(`${response.message}`, ToastAndroid.LONG);
          }
        } catch (error) {
          console.log(error);
          ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
        }
      }
      const handleCollectedChange =async(data)=>{
        try {
          if(data === 'driver'){
            setcheckuser("driver")
            const response = await GetDriversByBranchId();
            if(response.success){
              setUser(response.data)
            }else{
              ToastAndroid.show(`${response.message}`, ToastAndroid.LONG);
            }
          }else if(data === 'staff'){
            setcheckuser("staff")
            const response = await GetStaffByBranchId();
            if(response.success){
              setUser(response.data)
            }else{
              ToastAndroid.show(`${response.message}`, ToastAndroid.LONG);
            }
          }
        } catch (error) {
          console.log(error);
          ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
        }
      }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent={false} backgroundColor={Color.maincolor} />
      <ProgressSteps>
        <ProgressStep label="Basic Info" onNext={validateBasicInfo} errors={hasErrors}>
          <View style={styles.basicInfoView}>
          <Text style={styles.label}>Booking Number</Text>
            <TextInput placeholder='Booking No' style={styles.textinput} value={formData.bookingNo} readOnly />
            <Text style={styles.label}>Branch</Text>
            <TextInput placeholder='Branch' style={styles.textinput} value={branch} readOnly />
            {/* <View style={styles.pickerView}>
            <Picker style={{ color: Color.Black }} selectedValue={formData.branchList} onValueChange={(value) => handleInputChange('branchList', value)}>
                <Picker.Item label="Select Branch List" value="" />
                {branchList.map((item) => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                ))}
              </Picker>
              </View> */}
          </View>
        </ProgressStep>
        <ProgressStep label="Customer Info" onNext={validateSenderInfo} errors={has2Errors}>
          <View style={styles.basicInfoView}>
          <Text style={styles.text}>Sender Info</Text>
            <View style={styles.btnandpickerview}>
           
            <View style={styles.pickerViews}>
            <Picker
                style={{ color: Color.Black }}
                selectedValue={formData.selectSender}
                onValueChange={handleSenderChange}
            >
                <Picker.Item label={data?.sender?.name} value="" />
                {sender.map((item) => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                ))}
            </Picker>
            </View>
            <TouchableOpacity style={styles.cstAddbtn} onPress={() => setModal(true)}>
              {/* <Text style={styles.text}>Create Sender</Text> */}
              <Image source={AddIcon}/>
            </TouchableOpacity>
            </View>
           
            <TextInput
                placeholder='Address'
                style={styles.textinput}
                value={formData.senderAddress}
                onChangeText={(value) => handleInputChange('senderAddress', value)}
            />
            <TextInput
                placeholder='Phone'
                style={styles.textinput}
                value={formData.senderPhone}
                onChangeText={(value) => handleInputChange('senderPhone', value)}
            />
        </View>
        <View style={styles.basicInfoView}>
          <Text style={styles.text}>Reciever Info</Text>
        <View style={styles.btnandpickerview}>
       
            <View style={styles.pickerViews}>
            <Picker
                style={{ color: Color.Black }}
                selectedValue={formData.selectCustomer}
                onValueChange={handleRecieverChange}
            >
                <Picker.Item label={data?.reciver?.name} value="" />
                {reciever.map((item) => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                ))}
            </Picker>
            </View>
            <TouchableOpacity style={styles.cstAddbtn} onPress={() => setRecieverModal(true)}>
            <Image source={AddIcon}/>
            </TouchableOpacity>
            </View>
            <TextInput
                placeholder='Address'
                style={styles.textinput}
                value={formData.customerAddress}
                onChangeText={(value) => handleInputChange('customerAddress', value)}
            />
            <TextInput
                placeholder='Phone'
                style={styles.textinput}
                value={formData.customerPhone}
                onChangeText={(value) => handleInputChange('customerPhone', value)}
            />
        </View>
        </ProgressStep>
        {/* <ProgressStep label="Reciever Info" onNext={validateRecieverInfo} errors={hasErrors}>
     
        </ProgressStep> */}
        
        <ProgressStep label="Shipping Info" onSubmit={onPaymentStepComplete} errors={hasErrors}>
          <View>
            <View style={styles.pickerView}>
              <Picker style={{ color: Color.Black }} selectedValue={formData.courierCompany} onValueChange={(value) => handleInputChange('courierCompany', value)}>
                <Picker.Item label={data?.collection_details?.courier_company} value="" />
                {courier.map((item) => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                ))}
              </Picker>
            </View>
            <View style={styles.pickerView}>
              <Picker style={{ color: Color.Black }} selectedValue={formData.shippingMethod} onValueChange={(value) => handleInputChange('shippingMethod', value)}>
              <Picker.Item label={data?.collection_details?.shipping_method} value="" />
              {shippingMethod.map((item) => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                ))}
              </Picker>
            </View>
            <View style={styles.pickerView}>
              <Picker style={{ color: Color.Black }} selectedValue={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                <Picker.Item label={data?.charges_payments?.payment_method} value="" />
                {paymentMethod.map((item) => (
                    <Picker.Item key={item.id} label={item.title} value={item.id} />
                ))}
              </Picker>
            </View>
            <View style={styles.pickerView}>
              <Picker style={{ color: Color.Black }} selectedValue={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <Picker.Item label={data?.collection_details?.shipment_status} value="" />
                {status.map((item) => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                ))}
              </Picker>
            </View>
            <View>
      <TextInput
        placeholder="Date"
        style={styles.textinput}
        value={date}  // Ensure this displays the date
        onPressIn={showDatePicker}
        onFocus={showDatePicker}
        // onChangeText={(value) => handleInputChange('date', value)}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
            <View style={styles.pickerView}>
              <Picker style={{ color: Color.Black }} selectedValue={formData.collectBy} onValueChange={(value) => {handleInputChange('collectBy', value),handleCollectedChange(value)}}>
                <Picker.Item label="Select Collect By" value="" />
                {collectBy.map((item) => (
                    <Picker.Item key={item.id} label={item.title} value={item.id} />
                ))}
              </Picker>
            </View>
            <View style={styles.pickerView}>
              <Picker style={{ color: Color.Black }} selectedValue={formData.name} onValueChange={(value) => handleInputChange('name', value)}>
              <Picker.Item label={data?.other_details?.staff} value="" />
                {user.map((item) => (
                    <Picker.Item key={item.id} label={item.name?item.name:item.full_name} value={item.id} />
                ))}
              </Picker>
            </View>
           <View style={styles.pickerView}>
              <Picker style={{ color: Color.Black }} selectedValue={formData.deliveryType} onValueChange={(value) => handleInputChange('deliveryType', value)}>
                <Picker.Item label="Select Delivery Type" value="" />
                <Picker.Item label="Door to Port" value="door_to_port" />
                <Picker.Item label="Doot to door" value="door_to_door" />
              </Picker>
            </View>
            <View>
            <TextInput placeholder='Time' style={styles.textinput} value={time} onFocus={showTimePicker} onPressIn={showTimePicker} onChangeText={(value) => handleInputChange('time', value)} />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
            />
            </View>
            <TextInput placeholder='value of goods' style={styles.textinput} value={formData.valueOfGoods} onChangeText={(value) => handleInputChange('valueOfGoods', value)} />
            <TextInput placeholder='Special Remark' style={styles.textinput} value={formData.specialRemark} onChangeText={(value) => handleInputChange('specialRemark', value)} />

          </View>
        </ProgressStep>
      </ProgressSteps>

      {modal && <CreateCustomer navigation={navigation} setModal={setModal} datafetch={SenderCustomerfetch}/>}
      {recieverModal && <CreateReciever navigation={navigation} setModal={setRecieverModal} datafetch={RecieverCustomerfetch} />}
    </View>
  )
}

export default Editinvoice
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    textinput:{
        height:65,
        width:"100",
        color:Color.Black,
        marginHorizontal:45,
        marginVertical:10,
        borderBottomWidth: 2,
        borderWidth:0.1,
        borderBottomColor: Color.maincolor,
        backgroundColor:Color.light,
        borderColor:Color.maincolor,
        backgroundColor:Color.light,
        borderRadius:10,
        paddingLeft:25,
    },
    label: {
      fontSize: 15,
      marginHorizontal:deviceWidth*0.15,
      marginTop:deviceHeight*0.03,
      color:Color.Black,
    },
    basicInfoView:{
        justifyContent:"center",
        marginVertical:10,
    },
    pickerView:{
        borderBottomWidth: 2,
        borderWidth:0.1,
        marginVertical:5,
        borderBottomColor: Color.maincolor,
        backgroundColor:Color.light,
        borderColor:Color.maincolor,
        borderRadius: 10,
        overflow: 'hidden',
        height:65,
        marginHorizontal:45,
        justifyContent:"center",
        fontStyle:"italic",
      },
      pickerViews: {
        flex: 1, // Take up remaining space
        borderBottomWidth: 2,
        borderWidth: 0.1,
        marginVertical: 5,
        marginHorizontal: 15,
        borderBottomColor: Color.maincolor,
        backgroundColor: Color.light,
        borderColor: Color.maincolor,
        borderRadius: 10,
        height: 65,
        justifyContent: 'center', // Center the picker vertically
        paddingHorizontal: 10, // Add padding for better spacing
      },
      btnandpickerview: {
        flexDirection: 'row',
        alignItems: 'center', // Center the content vertically
        justifyContent: 'flex-start',
        marginHorizontal: 35,
      },
      cstAddbtn:{
        // backgroundColor:Color.maincolor,
        // width:"100",
        height:45,
        // alignItems:"center",
        // justifyContent:"center",
        borderRadius:10,
        marginVertical:15,
      },
      text:{
        color:Color.Black,
        fontWeight:"900",
        textAlign:"center"
    },
      
})