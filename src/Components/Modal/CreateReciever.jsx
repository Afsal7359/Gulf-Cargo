import { TouchableOpacity, Dimensions, Platform, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import Color from '../Color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { AddSenderapi, GetCountries, GetDistricts, GetStates } from '../../Api/AddSenderApi';
import { checkTokenAndProceed } from '../Tokencheck/TockenCheck';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';

const CreateReciever = ({navigation,setModal,datafetch}) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [fileError, setFileError] = useState('');
  useEffect(()=>{
    checkTokenAndProceed(navigation)
  },[])
  const deviceWidth = Dimensions.get("window").width;
  const insets = useSafeAreaInsets();
  const deviceHeight = Dimensions.get('window').height + insets.top + insets.bottom;

  const [selectedFile, setSelectedFile] = useState(null);
  const [country,setCountry]=useState([]);
  const [states,setStates]=useState([]);
  const [District,setDistrict]=useState([])

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    });


    if (result.canceled === false) {
      const { size, uri } = result;
      const fileSizeInMB = size / (1024 * 1024);
      console.log(result,"res");
      if (fileSizeInMB > 10) {
        setFileError('File size should be below 10MB');
      } else {
        setFileError('');
        setSelectedFile(result.assets[0]);
        console.log(result,"result");
        
      }
    } else {
      setFileError('No file selected');
    }
  };

  useEffect(()=>{
    CountryDataFetch();
  },[])

  const CountryDataFetch = async()=>{
    try {
      if(country.length ===0){
        const response = await GetCountries();
        if(response.success){
          console.log(response.data);
          setCountry(response.data)
        }
      }
     
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Network Problem !!", ToastAndroid.LONG);
      
    }
  } 
  
  // Fetch State Data using Country Data 
  useEffect(()=>{
    const StateDataFetch =async()=>{
      try {
        console.log(selectedCountry,"id");
          const response = await GetStates(selectedCountry);
          if(response.success){
            console.log(response.data);
            setStates(response.data)
          }else{
            console.log(response,"error");
        }
      
      } catch (error) {
        console.log(error);
        ToastAndroid.show("network problem !!", ToastAndroid.LONG); 
        
      }
    }
    if(selectedCountry){
      StateDataFetch();
      const selectcountry = country.find(c => c.id === selectedCountry);
      if (selectcountry) {
        handleInputChange('country_code_phone', selectcountry.phonecode);
        handleInputChange('country_code_whatsapp', selectcountry.phonecode);
      }
    }
  },[selectedCountry])

  //Fetch District data using State Data
  useEffect(()=>{
    const DistrictDataFetch =async()=>{
      try {
        const response = await GetDistricts(selectedState);
        if(response.success){
          console.log(response,"re");
          setDistrict(response.data)
        }else{
          console.log(response,'error');
          
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Network problem !!", ToastAndroid.LONG);
      }
    }
    if(selectedState){
      DistrictDataFetch();
    }
  },[selectedState])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country_code_phone: '',
    phone: '',
    country_code_whatsapp: '',
    whatsapp_number: '',
    type: 'receiver',
    client_identification_type: '',
    client_identification_number: '',
    created_by: '',
    country_id:"",
    state_id:"",
    district_id:"",
    cities:"",
    post:"",
    zip_code:"",
    address:"",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  // const handleCountryChange = (value) => {
  //   const selectcountry = country.find(c => c.id === value);
  //   if (selectcountry) {
  //     handleInputChange('country_code_phone', selectcountry.phonecode);
  //     handleInputChange('country_code_whatsapp', selectcountry.phonecode);
  //   }
  // };
  const validateFields = () => {
    let valid = true;
    let errors = {};

    if (!formData.name) {
      errors.name = 'Name is required';
      valid = false;
    }

    // if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    //   errors.email = 'Valid email is required';
    //   valid = false;
    // }

    if (!formData.client_identification_type) {
      errors.client_identification_type = 'Identification type is required';
      valid = false;
    }

    if (!formData. client_identification_number) {
      errors. client_identification_number = 'Document ID is required';
      valid = false;
    }

    if (!formData.country_id) {
      errors.country_id = 'Country is required';
      valid = false;
    }

    if (!formData.state_id) {
      errors.state_id = 'State is required';
      valid = false;
    }

    // if (!formData.selectedDistrict) {
    //   errors.selectedDistrict = 'District is required';
    //   valid = false;
    // }

    if (!formData.cities) {
      errors.cities = 'City is required';
      valid = false;
    }

    if (!formData.post) {
      errors.post = 'Post is required';
      valid = false;
    }

    if (!formData.zip_code) {
      errors.zip_code = 'Zip/Pin Code is required';
      valid = false;
    }

    if (!formData.whatsapp_number || !/^\d+$/.test(formData.whatsapp_number)) {
      errors.whatsapp_number = 'Whatsapp Number must be numeric';
      valid = false;
    }

    if (!formData.phone || !/^\d+$/.test(formData.phone)) {
      errors.phone = 'Phone Number must be numeric';
      valid = false;
    }

    if (!formData.address) {
      errors.address = 'Address is required';
      valid = false;
    }
    if (!selectedFile) {
      setFileError('Document is required');
      valid = false;
    }

    setErrors(errors);
    return valid;
  };
  const handleSubmit = async () => {
    if (validateFields()) {
      console.log(formData,"formdata");
      
      const data = new FormData();

      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      const userInfo = await AsyncStorage.getItem('userInfo');
      const user = JSON.parse(userInfo);
      data.append('branch_id', user.branch_id)
      if (selectedFile) {
        console.log(selectedFile,"selfile");
        
        data.append('document', {
          uri: selectedFile.uri,
          type:   selectedFile.mimeType || 'application/octet-stream',
          name: selectedFile.name
        });
      }
      try {
        const response = await AddSenderapi(data);
        if(response.success){
          setModal(false)
          datafetch()
          Toast.success("Receiver Added Sucessfully");
          console.log(response,"res-suc");
        }else{
          ToastAndroid.show(`${response.message}`, ToastAndroid.LONG);
          console.log(response,"res-error");
          
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Network problem !!", ToastAndroid.LONG);
        
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    errorText: {
      color: 'red',
      paddingLeft:20
    },
    pickerAndInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop:1
    },
    pickerContainer: {
      width:deviceWidth*0.33,
      marginRight: 1, 
      borderBottomWidth: 2,
      borderWidth:0.1,
      borderBottomColor: Color.maincolor,
      backgroundColor:Color.light,
      borderColor:Color.maincolor,
      borderRadius: 10,
      height:deviceHeight*0.055,
      justifyContent:"center",
    },
   
    textinputnum: {
      flex: 2,
      borderBottomWidth: 2,
      borderWidth:0.1,
      borderBottomColor: Color.maincolor,
      backgroundColor:Color.light,
      borderColor:Color.maincolor,
      borderRadius: 10,
      paddingHorizontal: 8,
      height:deviceHeight*0.055,
    },
    modalcontainer:{
      height:deviceHeight*0.9,
      width:(deviceWidth)*0.9,
      backgroundColor:Color.whitecolor,
      borderRadius:15,
    },
    textinput:{
      height:deviceHeight*0.055,
      width:deviceWidth*0.8,
      marginHorizontal:deviceWidth*0.05,
      marginVertical:10,
      borderBottomWidth: 2,
      borderWidth:0.1,
      borderBottomColor: Color.maincolor,
      backgroundColor:Color.light,
      borderColor:Color.maincolor,
      color:Color.Black,
      borderRadius:10,
      paddingLeft:25,
      marginHorizontal:deviceWidth*0.066,
      marginTop:deviceHeight*0.03
  },
  submitbtn:{
    height:deviceHeight*0.055,
      width:deviceWidth*0.8,
      marginHorizontal:deviceWidth*0.05,
      marginVertical:10,
      backgroundColor:Color.maincolor,
      borderRadius:10,
      justifyContent:"center",
      alignItems:"center",
      marginHorizontal:deviceWidth*0.066,
      marginTop:deviceHeight*0.03
  },
  pickerview:{
    height:deviceHeight*0.055,
    width:deviceWidth*0.8,
    marginHorizontal:deviceWidth*0.05,
    marginVertical:10,
    justifyContent:"center",
    borderBottomWidth: 2,
    borderWidth:0.1,
    backgroundColor:Color.light,
    borderColor:Color.maincolor,
    borderBottomColor: Color.maincolor,
    borderRadius:10,
    paddingLeft:25,
  },
  Imagepicker:{
    height:"auto",
    width:"100",
    minHeight:deviceHeight*0.055,
    paddingLeft:15,
    marginVertical:10,
    justifyContent:"center",
    borderBottomWidth: 2,
    borderWidth:0.1,
    borderBottomColor: Color.maincolor,
    backgroundColor:Color.light,
    borderColor:Color.maincolor,
    borderRadius:10,
    marginHorizontal:deviceWidth*0.066,
    marginTop:deviceHeight*0.03
  },
  textbtn:{
    color:Color.whitecolor,
  },
  label: {
    fontSize: 15,
    marginHorizontal:deviceWidth*0.066,
    marginTop:deviceHeight*0.03
  },
  adsender:{
    textAlign:"center",
    fontSize:25,
    fontWeight:"800",
    marginVertical:deviceHeight*0.012
  },
  })
  return (
    <>
      <Modal isVisible={isModalVisible} onBackButtonPress={()=>setModal(false)}>
      <ScrollView style={styles.modalcontainer}>
      <View>
        <Text style={styles.adsender}>Add Receiver</Text>
      </View>

      <View>
        <TextInput
          placeholder='Name'
          style={styles.textinput}
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          placeholder='Email'
          style={styles.textinput}
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Select Receiver Identification Type:</Text>
        <View style={styles.pickerview}>
          <Picker
            selectedValue={formData.client_identification_type}
            onValueChange={(value) => handleInputChange('client_identification_type', value)}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Emirates Id" value="emirates_id" />
            <Picker.Item label="Aadhar" value="aadhar" />
            <Picker.Item label="Driving Licence" value="Driving Licence" />
            <Picker.Item label="Passport" value="Passport " />
            <Picker.Item label="Iqama" value="Iqama" />
            <Picker.Item label="Other " value="Other " />
          </Picker>
        </View>
        {errors.client_identification_type && <Text style={styles.errorText}>{errors.client_identification_type}</Text>}

        <TextInput
          placeholder='Document Id'
          style={styles.textinput}
          value={formData.client_identification_number}
          onChangeText={(text) => handleInputChange('client_identification_number', text)}
        />
        {errors.client_identification_number && <Text style={styles.errorText}>{errors.client_identification_number}</Text>}

        <View style={styles.Imagepicker}>
          <TouchableOpacity onPress={pickFile}>
            {!selectedFile ? (
              <Text style={styles.buttonText}>Select Document</Text>
            ) : (
              <Text style={styles.fileInfo}>Selected File: {selectedFile.name}</Text>
            )}
          </TouchableOpacity>
        </View>
        {fileError && <Text style={styles.errorText}>{fileError}</Text>}
      </View>

      <View>
        <Text style={styles.adsender}>Add Address</Text>
      </View>

      <Text style={styles.label}>Select Country:</Text>
      <View style={styles.pickerview}>
        <Picker
          selectedValue={formData.country_id}
          onValueChange={(value) => {setSelectedCountry(value), handleInputChange('country_id', value)}}
        >
          <Picker.Item label="Select" value="" />
          {country.map((country) => (
            <Picker.Item key={country.id} label={country.name} value={country.id} />
          ))}
        </Picker>
      </View>
      {errors.country_id && <Text style={styles.errorText}>{errors.country_id}</Text>}

      <Text style={styles.label}>Select State:</Text>
      <View style={styles.pickerview}>
        <Picker
          selectedValue={formData.state_id}
          onValueChange={(value) => {setSelectedState(value),handleInputChange('state_id', value)}}
        >
          <Picker.Item label="Select" value="" />
          {states.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.id} />
          ))}
        </Picker>
      </View>
      {errors.state_id && <Text style={styles.errorText}>{errors.state_id}</Text>}

      <Text style={styles.label}>Select District:</Text>
      <View style={styles.pickerview}>
        <Picker
          selectedValue={formData.district_id}
          onValueChange={(value) => handleInputChange('district_id', value)}
        >
          <Picker.Item label="Select" value="" />
          {District.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.id} />
          ))}
        </Picker>
      </View>
      {errors.district_id && <Text style={styles.errorText}>{errors.district_id}</Text>}

      <TextInput
        placeholder='City'
        style={styles.textinput}
        value={formData.cities}
        onChangeText={(text) => handleInputChange('cities', text)}
      />
      {errors.cities && <Text style={styles.errorText}>{errors.cities}</Text>}

      <TextInput
        placeholder='Post'
        style={styles.textinput}
        value={formData.post}
        onChangeText={(text) => handleInputChange('post', text)}
      />
      {errors.post && <Text style={styles.errorText}>{errors.post}</Text>}

      <TextInput
        placeholder='Zip/Pin Code'
        style={styles.textinput}
        value={formData.zip_code}
          keyboardType="numeric"
        onChangeText={(text) => handleInputChange('zip_code', text)}
      />
      {errors.zip_code && <Text style={styles.errorText}>{errors.zip_code}</Text>}

      <Text style={styles.label}>Select Country Code:</Text>
      <View style={styles.container}>
        <View style={styles.pickerAndInputContainer}>
          <View style={styles.pickerContainer}>
          <Picker  selectedValue={formData.country_code_whatsapp}
              onValueChange={(value) => handleInputChange('country_code_whatsapp', value)}
            >
              {country.map((country) => (
                <Picker.Item key={country.id} label={`+ ${country.phonecode}`} value={country.phonecode} />
              ))}
            </Picker>
          </View>
          <TextInput
            placeholder='Whatsapp Number'
            style={styles.textinputnum}
            keyboardType="numeric"
            value={formData.whatsapp_number}
            onChangeText={(text) => handleInputChange('whatsapp_number', text)}
          />
        </View>
      </View>
      {errors.whatsapp_number && <Text style={styles.errorText}>{errors.whatsapp_number}</Text>}

      <Text style={styles.label}>Select Country Code:</Text>
      <View style={styles.container}>
        <View style={styles.pickerAndInputContainer}>
          <View style={styles.pickerContainer}>
          <Picker  selectedValue={formData.country_code_phone}
              onValueChange={(value) => handleInputChange('country_code_phone', value)}
            >
              {country.map((country) => (
                <Picker.Item key={country.id} label={`+ ${country.phonecode}`} value={country.phonecode} />
              ))}
            </Picker>
          </View>
          <TextInput
            placeholder='Phone Number'
            style={styles.textinputnum}
            keyboardType="numeric"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
          />
        </View>
      </View>
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <TextInput
        placeholder='address'
        style={styles.textinput}
        value={formData.address}
        onChangeText={(text) => handleInputChange('address', text)}
      />
      {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

      <TouchableOpacity style={styles.submitbtn} onPress={handleSubmit}>
        <Text style={styles.textbtn}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
      </Modal>
    </>
  )
}


export default CreateReciever

