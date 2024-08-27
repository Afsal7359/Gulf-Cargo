import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import Color from '../../../Components/Color';
import { AddCalculation, GetCalculation } from '../../../Api/Invoice';
import { Toast } from 'toastify-react-native';
import BackIcon from '../../../../assets/imagesS/back.png'
import TickIcon from '../../../../assets/Images/tickicon1.png'

const Calculation = ({ route, navigation }) => {
  const { id } = route.params;
  console.log(id, "id");

  const [data, setData] = useState({
    totalWeight: { quantity: '', unitRate: '', amount: 0, manualAmount: false },
    duty: { quantity: '', unitRate: '', amount: 0, manualAmount: false },
    packingCharge: { quantity: '', unitRate: '', amount: 0, manualAmount: false },
    additionalPackingCharge: { quantity: '', unitRate: '', amount: 0, manualAmount: false },
    insurance: { quantity: '', unitRate: '', amount: 0, manualAmount: false },
    awbFee: { quantity: '', unitRate: '', amount: 0, manualAmount: false },
    vatAmount: { quantity: '', unitRate: '', amount: 0, manualAmount: false },
    volumeWeight: { quantity: '', unitRate: '', amount: 0, manualAmount: false },
    discount: { quantity: '', unitRate: '', amount: 0, manualAmount: false },
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [numberOfPcs, setNumberOfPcs] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const CalculationDataFetch = async () => {
      try {
        const response = await GetCalculation(id);
        if (response.success) {
          console.log(response, "su");
          const fetchedData = response.data;
          
          // Initialize form data
          setData({
            totalWeight: { quantity: fetchedData.grand_total_weight || '', unitRate: fetchedData.rate_normal_weight || '', amount: fetchedData.amount_normal_weight || 0, manualAmount: false },
            duty: { quantity: fetchedData.electronics_weight || '', unitRate: fetchedData.rate_electronics_weight || '', amount: fetchedData.amount_electronics_weight || 0, manualAmount: false },
            packingCharge: { quantity: fetchedData.msic_weight || '', unitRate: fetchedData.rate_msic_weight || '', amount: fetchedData.amount_msic_weight || 0, manualAmount: false },
            additionalPackingCharge: { quantity: fetchedData.add_pack_charge || '', unitRate: fetchedData.rate_add_pack_charge || '', amount: fetchedData.amount_add_pack_charge || 0, manualAmount: false },
            insurance: { quantity: fetchedData.insurance || '', unitRate: fetchedData.rate_insurance || '', amount: fetchedData.amount_insurance || 0, manualAmount: false },
            awbFee: { quantity: fetchedData.awbfee || '', unitRate: fetchedData.rate_awbfee || '', amount: fetchedData.amount_awbfee || 0, manualAmount: false },
            vatAmount: { quantity: fetchedData.vat_amount || '', unitRate: fetchedData.rate_vat_amount || '', amount: fetchedData.amount_vat_amount || 0, manualAmount: false },
            volumeWeight: { quantity: fetchedData.volume_weight || '', unitRate: fetchedData.rate_volume_weight || '', amount: fetchedData.amount_volume_weight || 0, manualAmount: false },
            discount: { quantity: fetchedData.discount_weight || '', unitRate: fetchedData.rate_discount_weight || '', amount: fetchedData.amount_discount_weight || 0, manualAmount: false },
          });
          setTotalAmount(fetchedData.amount_grand_total)
          setNumberOfPcs(fetchedData.number_of_pcs_create || '');
          setIsEditing(true);
        } else {
          console.log(response, "err");
        }
      } catch (error) {
        console.log(error);
      }
    };

    CalculationDataFetch();
  }, [id]);

  const calculateAmount = (quantity, unitRate) => {
    return (parseFloat(quantity) || 0) * (parseFloat(unitRate) || 0);
  };

  const handleChange = (key, field, value) => {
  const numericValue = parseFloat(value) || 0;

  // Update item based on the field being changed
  const updatedItem = {
    ...data[key],
    [field]: numericValue,
    manualAmount: field === 'amount' ? true : data[key].manualAmount,
  };

  // Recalculate amount if quantity or unitRate changes and manualAmount is false
  if (field === 'quantity' || field === 'unitRate') {
    updatedItem.amount = data[key].manualAmount
      ? updatedItem.amount
      : calculateAmount(updatedItem.quantity, updatedItem.unitRate);
  }

  // Update the state with the new item
  const newData = { ...data, [key]: updatedItem };
  setData(newData);

  // Calculate total amount after updating the state
  calculateTotalAmount(newData);
};
const calculateTotalAmount = (updatedData) => {
  // Calculate total amount by summing up all amounts
  let total = Object.values(updatedData).reduce((sum, curr) => parseFloat(sum) + parseFloat(curr.amount), 0);

  // Apply discount if necessary
  const discountAmount = updatedData.discount.amount * 2 || 0;
  total -= discountAmount;
const totaldata = (total.toFixed(2))
  // Format total amount to 2 decimal places
  setTotalAmount(totaldata);
};


  const handleSubmit = async () => {
    // for (const key in data) {
    //   const item = data[key];
    //   if (!item.quantity || !item.unitRate) {
    //     Alert.alert('Error', `Please fill out all fields for ${key.split(/(?=[A-Z])/).join(' ')}.`);
    //     return;
    //   }
    // }

    // if (!numberOfPcs) {
    //   Alert.alert('Error', 'Please fill out the Number of Pcs.');
    //   return;
    // }

    const FormsData = {
      shipment_id: id,
      grand_total_weight: data?.totalWeight.quantity,
      rate_normal_weight: data?.totalWeight.unitRate,
      amount_normal_weight: data?.totalWeight.amount,
      electronics_weight: data?.duty.quantity,
      rate_electronics_weight: data?.duty.unitRate,
      amount_electronics_weight: data?.duty.amount,
      msic_weight: data?.packingCharge.quantity,
      rate_msic_weight: data?.packingCharge.unitRate,
      amount_msic_weight: data?.packingCharge.amount,
      add_pack_charge: data?.additionalPackingCharge.quantity,
      rate_add_pack_charge: data?.additionalPackingCharge.unitRate,
      amount_add_pack_charge: data?.additionalPackingCharge.amount,
      insurance: data?.insurance.quantity,
      rate_insurance: data?.insurance.unitRate,
      amount_insurance: data?.insurance.amount,
      awbfee: data?.awbFee.quantity,
      rate_awbfee: data?.awbFee.unitRate,
      amount_awbfee: data?.awbFee.amount,
      vat_amount: data?.vatAmount.quantity,
      rate_vat_amount: data?.vatAmount.unitRate,
      amount_vat_amount: data?.vatAmount.amount,
      volume_weight: data?.volumeWeight.quantity,
      rate_volume_weight: data?.volumeWeight.unitRate,
      amount_volume_weight: data?.volumeWeight.amount,
      discount_weight: data?.discount.quantity,
      rate_discount_weight: data?.discount.unitRate,
      amount_discount_weight: data?.discount.amount,
      amount_grand_total: totalAmount,
    };

    console.log('Data:', FormsData);
    const response = await AddCalculation(FormsData)
    if (response.success) {
      console.log(response, "su");
      Toast.success("Calculation processed successfully");
      navigation.navigate('cargoview', { data: id });
    } else {
      console.log(response.data, "err");
    }
    console.log('Number of Pcs:', numberOfPcs);
  };

  return (
    <ScrollView>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <Text style={styles.headerBackText}>Back</Text> */}
          <Image source={BackIcon} style={{height:35,width:35}}/>
        </TouchableOpacity>
        <Text style={{color:Color.whitecolor,fontSize:20,fontWeight:"900"}}>Add Calculation</Text>
        <View style={styles.btnview}>
        {/* <TouchableOpacity onPress={addItem} style={styles.addbtnss}>
        <Image source={AddIcon}  style={{height:40,width:40}}/>
        </TouchableOpacity> */}
        <TouchableOpacity  onPress={handleSubmit}>
        <Image source={TickIcon}  style={{height:35,width:35,marginTop:2}}/>
        </TouchableOpacity>
        </View>
       
       
      </View>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText1}>Description</Text>
          <Text style={styles.headerText}>Quantity</Text>
          <Text style={styles.headerText}>Unit Rate</Text>
          <Text style={styles.headerText}>Amount</Text>
        </View>
        {Object.keys(data).map((key) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{key.split(/(?=[A-Z])/).join(' ')}</Text>
            <TextInput
              style={styles.input}
              value={data[key].quantity.toString()}
              onChangeText={(text) => handleChange(key, 'quantity', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={data[key].unitRate.toString()}
              onChangeText={(text) => handleChange(key, 'unitRate', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={data[key].amount.toString()}
              onChangeText={(text) => handleChange(key, 'amount', text)}
              readOnly
              keyboardType="numeric"
            />
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total Amount:</Text>
          <Text style={styles.totalAmount}>{totalAmount}</Text>
        </View>
        <View style={styles.row2}>
          <Text>Number Of Pcs</Text>
          <TextInput
            style={styles.input2}
            value={numberOfPcs}
            onChangeText={setNumberOfPcs}
            keyboardType="numeric"
          />
        </View>
        {/* <View style={styles.containers}>
          <TouchableOpacity style={styles.subbtn} onPress={handleSubmit}>
            <Text style={{ color: Color.whitecolor,textAlign:"center" }}>Submit</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderColor:Color.maincolor,
    borderWidth:10,

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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderTopWidth:1,
    paddingTop:15,
    borderColor:Color.maincolor,
    paddingBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: 90,
  },
  headerText1: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: 70,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-around",
    marginBottom: 10,
    marginTop: 25,
  },
  label: {
    width: 90,
    fontSize: 12,
    textAlign: 'left',
    fontWeight:"700"
  },
  input: {
    borderWidth: 1,
    borderColor: Color.maincolor,
    borderRadius:8,
    padding: 8,
    width: 70,
    marginHorizontal: 4,
    textAlign: 'center',
    color:Color.Black
  },
  input2: {
    borderWidth: 1,
    borderColor: Color.maincolor,
    borderRadius:10,
    padding: 8,
    width: 150,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  amount: {
    width: 80,
    textAlign: 'center',
    lineHeight: 40,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  containers: {
    marginTop: 20,
    alignItems: 'center',
  },
  subbtn: {
    backgroundColor: Color.maincolor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9,
    width:200,
  },
});

export default Calculation;
