import { Image, ScrollView, StyleSheet,TouchableOpacity, Text, View, StatusBar, ToastAndroid, ActivityIndicator, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Editicon from '../../../assets/Images/edit.png'
import Printicon from '../../../assets/Images/print.png'
import AddBoxIcon from '../../../assets/Images/addbox.png'
import CalculateIcon from '../../../assets/Images/calculate.png'
import Color from '../../Components/Color'
import { checkTokenAndProceed } from '../../Components/Tokencheck/TockenCheck'
import { DeleteBox, GetBoxes } from '../../Api/box'
import { PrintInvoice, ViewInvoice } from '../../Api/Invoice'
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import DeleteIcon from '../../../assets/Images/deleteicon.png'
import { baseURL } from '../../Api/axiosinstance'
import { Toast } from 'toastify-react-native'

const Cargoview = ({route,navigation}) => {
    const { data } = route.params;
    const [boxdata,setBoxData]=useState([]);
    const [boxnumber,setBoxNumber]=useState(0)
    const [reciever,setReciever]=useState();
    const [sender,setSender]=useState();
    const [customer,setCustomer]=useState({});
    const [collectiondetails,setCollectionDetails]=useState();
    const [charges,setCharges]=useState();
    const [otherDetails,setOtherDetails]=useState();
    const [loading,setLoading]=useState(false)
    const [printItem,setPrintItem]=useState({});
    const [firstArray,setFirstArray]=useState([]);
    const [secondArray,setSecondArray]=useState([]);
    const [editData,setEditData]=useState()

    const itemsPerRow = 3;
    useEffect(()=>{
        checkTokenAndProceed(navigation)
      },[])
    console.log(data,"fdata");

    useEffect(()=>{
        BoxDataFetch();
        InvoiceDataFetch();
        handlePrint();
    },[route])
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
    const InvoiceDataFetch = async()=>{
        try {
            setLoading(true);
            const response = await ViewInvoice(data);
            if(response.success){
                console.log(response,"su");
                setEditData(response.data)
                setReciever(response.data.reciver);
                setCustomer(response.data.customer);
                setSender(response.data.sender);
                setCollectionDetails(response.data.collection_details);
                setCharges(response.data.charges_payments);
                setOtherDetails(response.data.other_details);
                setLoading(false)
            }else{
                console.log(response,"err");
                ToastAndroid.show(`${response.message}`,ToastAndroid.LONG);
                
            }
        } catch (error) {
            console.log(error,"err");
            ToastAndroid.show("Network Error !!",ToastAndroid.LONG)
        }
    }
      const handlePrint = async()=>{
        try {
            setLoading(true);
            const response = await PrintInvoice(data);
            if(response.success){
                console.log(response.data);
                setPrintItem(response.data);
                const middleIndex = Math.ceil(response.data.packages.length / 2);

                // Split the array into two halves
                setFirstArray(response.data.packages.slice(0, middleIndex));
                setSecondArray( response.data.packages.slice(middleIndex));
                
                setLoading(false)
            }else{
                console.log(response,"res");
                
            }
        } catch (error) {
            ToastAndroid.show('Network-error',ToastAndroid.LONG);
            console.log(error);
            
        }
      }
      const today = new Date();

      // Format the date as dd/mm/yyyy
      const formattedDate = today.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const generatePDF = async () => {
        try {
            const tableRows = firstArray.map((item, index) => (
                `<tr key=${item.id}>
                  <td>${index+1}</td>
                  <td>${item.description}</td>
                </tr>`
              )).join('');
              const tableRows2 = secondArray.map((item, index) => (
                `<tr key=${item.id}>
                  <td>${index+firstArray.length+1}</td>
                  <td>${item.description}</td>
                </tr>`
              )).join('');
              const formattedText = printItem?.receiver?.address?.address.replace(/,/g, ', ');
            // Generate the PDF
            const { uri } = await Print.printToFileAsync({
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Print View</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

    <style>
        @media print{
            body{
                width: 1100px !important;
            }
            .main{
                size: a4;
            }
            /* .header_text h3{
                font-size: 20px;
            } */
            .add_headings{
                margin-top: 5px !important;
            }
            .shipper h4{
                padding: 4px 40px !important;
            }
            .consignee h4{
                padding: 4px 30px !important;
            }
            .slno h4{
                font-size: 18px;
            }
            .tbl_lft_txt{
                padding-top: 35% !important;
            }

            #printButton{
                display: none;
            }

        }


        .text-r{
            color: #EF1B39;
        }
        .text-b{
            color:#26235D ;
        }
        .main{
            height: auto;
            border: solid 1px #000;
            margin: 40px;
        }
        .logo_img{
            width: 450;
            height: 150px;
            margin: 40px;
            margin-top: 2px;
            padding: 20px;
        }
        .header_text{
            margin-top: 10px;
        }
        .shipper{
            padding-left: 14%;
            width: fit-content;
        }
        .shipper h4{
            color: #fff;
            background: #EF1B39;
            padding: 4px 60px;
            border-radius: 0px 25px 0px 0px;

        }
        .consignee{
            padding-left: 50%;
            width: fit-content;
        }
        .consignee h4{
            color: #fff;
            background: #EF1B39;
            padding: 4px 40px;
            border-radius: 0px 25px 0px 0px;

        }
        .slno{
            padding-left: 50%;
            width: fit-content;
        }
        .slno h4{
            color: #26235D;
            padding: 5px;
            border: solid 2px #26235D;
        }
        .address{
            font-family: 'Times New Roman', Times, serif;
            font-weight: bold;
            font-size: large;
            padding-left: 5%;
        }
        .shipper_address th{
            color: #201d52;
            padding: 5px;
        }
        .item_tables{
            padding-left: 4%;
            padding-right: 3%;
        }
        .item_tables {
            text-align: center;
            tr,td,th{
                border: solid 1px ;
            }
            tr td:first-child, tr th:first-child {
                width: 12%;
            }
            td{
                padding: 1px;
            }
        }
        .sub_table{
            margin-top: -17px;
        }
        .tbl_lft_txt{
            position: absolute;
            writing-mode: vertical-lr;
            transform: rotate(180deg);
            height: 100%;
            padding-right:20px;
            padding-top: 16%;
            color: #201d52;
        }
        .footer{
            padding-left: 5%;
            padding-right: 5%;
            .small_text p{
                font-size: 11px;
                margin: 0px;
            }
        }
        table{
            th,td{
            color:#201d52 !important;
            }
        }
        #printButton {
          position: fixed;
          top: 30px;
          left: 30px;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #c52014;
          color: #fff;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          z-index: 1000;
          width: 95px
      }

      #printButton:hover {
          background-color: #009eb3;
      }
    </style>
</head>

<body style="overflow-x: hidden; " >



    <div id="myElement" >
        <div class="main">
            <section>
                <div class="row" style="height: 156px   ;">
                    <div class="col-6">
                        <img src='${baseURL}${printItem.logo}' alt="" class="logo_img">
                    </div>
                    <div class="col-6 text-center header_text">
                        <h3 class="text-b">مؤسسة سواحل الخليج للنقل البحري</h3>
                        <h3 class="text-r">GULF CARGO AGENCY</h3>
                        <b class="text-b">Jeddah-Sharafiyah</b><br>
                        <b class="text-r">Mob. 053 100 7665, 056 998 7907</b>
                    </div>

                </div>
            </section>
            <section>
                <div class="row add_headings">
                    <div class="col-4 ">
                        <div class="shipper text-center">
                            <h4 class="">SHIPPER</h4>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="consignee text-center">
                            <h4 class="">CONSIGNEE</h4>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="slno text-center">
                            <h4 class="">SL : ${printItem?.booking_number}</h4>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="row  address">
                    <div class="col-6">
                        <table class="shipper_address">
                            <thead>
                                <tr>
                                    <th>Name </th>
                                    <th>:${printItem?.sender?.name}</th>
                                </tr>
                                <tr>
                                    <th>ID NO </th>
                                    <th>:${printItem?.sender?.identification_number}</th>
                                </tr>
                                <tr>
                                    <th>Tel </th>
                                    <th>:${printItem?.sender?.phone}</th>
                                </tr>
                                <tr>
                                    <th>No. of Pcs </th>
                                    <th>:${printItem?.no_of_pcs}</th>
                                </tr>
                                <tr>
                                    <th>Weight </th>
                                    <th>:${printItem.weight}</th>
                                </tr>
                                <tr>
                                    <th>Date </th>
                                    <th>:${formattedDate}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="col-6">
                        <table class="shipper_address">
                            <thead>

                                <tr>
                                    <th>Name </th>
                                    <th>:  ${printItem?.receiver?.name}</th>
                                </tr>
                                <tr>
                                    <th>Adress </th>
                                    <th>: ${formattedText}</th>
                                </tr>
                                <tr>
                                    <th>Village </th>
                                    <th>: ${printItem?.receiver?.city_name}</th>
                                </tr>
                                <tr>
                                    <th>Post </th>
                                    <th>: ${printItem?.receiver?.post} <span style="margin-left: 22px;">Pin</span> <span>: ${printItem?.receiver?.address?.zip_code}</span></th>
                                    <!-- <th> </th>
                                    <th></th> -->
                                </tr>
                                <tr>
                                    <th>Dist </th>
                                    <th>:${printItem?.receiver_district} <span style="margin-left: 70px;">State</span><span>: ${printItem?.receiver_state}</span></th>
                                    <!-- <th> </td>
                                    <th> </th> -->
                                </tr>
                                <tr>
                                    <th>T </th>
                                    <th>: ${printItem?.receiver?.country_code_whatsapp} ${printItem?.receiver?.whatsapp_number} <span style="margin-left: 30px;">M</span> <span> : ${printItem?.receiver?.country_code_phone} ${printItem?.receiver?.phone}</span></th>
                                    <!-- <th></th>
                                    <th></th> -->
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </section>

            <section>
               
                <div class="row item_tables pt-1">
                    <div class="col-6">
                        <table class="table table-responsive">
                            <thead>
                                <th>S. NO</th>
                                <th>ITEMS</th>
                            </thead>
                            <tbody>
                               ${tableRows}
                                
                            </tbody>
                        </table>
                    </div>
                    <div class="col-6">
                        <table class="table table-responsive ">
                            <thead>
                                <th>S. NO</th>
                                <th>ITEMS</th>
                            </thead>
                            <tbody>
                                ${tableRows2}
                            </tbody>
                            <table class="table table-responsive sub_table">
                                <tbody>
                                    <tr>
                                        <td style="width: 50%;">
                                            <div class="row">
                                                <div class="col-6 text-start">Total</div>
                                                <div class="col-6 text-end">المجموع</div>
                                            </div>
                                        </td>
                                        <td>${printItem?.total}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%;">
                                            <div class="row">
                                                <div class="col-6 text-start">Bill Charges</div>
                                                <div class="col-6 text-end">رسوم الفاتورة</div>
                                            </div>
                                        </td>
                                        <td>
                                           ${printItem?.bill_charges}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%;">
                                            <div class="row">
                                                <div class="col-6 text-start">VAT %</div>
                                                <div class="col-6 text-end">Arabi</div>
                                            </div>
                                        </td>
                                        <td>
                                                ${printItem?.vat}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%;">
                                            <div class="row">
                                                <div class="col-6 text-start">Net Total</div>
                                                <div class="col-6 text-end">Arabi</div>
                                            </div>
                                        </td>
                                        <td>
                                               ${printItem?.net_total}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </table>
                    </div>

                </div>
            </section>
            <section>
                <div class="row footer">
                    <div class="col-6 text-start" style="color: #ef1b39;"> <h6>TERMS AND CONDITIONS</h6></div>
                    <div class="col-6 text-end" style="color: #ef1b39;"> <h6>Thanks for your Vist ! Come Again !!</h6></div>
                    <div class="row pt-2 small_text">
                        <div class="col-12 text-center">
                            <h6 class="" style="color: #201d52;" >Accept the goods only after checking and confirming them on delivery.</h6>
                            <p style="color: #201d52;">1.NO GUARANTEE FOR GLASS/ BREAKABLE ITEMS COMPANY NOT RESPONSIBLE ITERS RECEIVED IN DAMAGED CONDITION. 2. COMPLAINTS WILL NOT BE ACCEPTED AFTER 2 DAYS FROM THE DATE OF DELIVERY 3. COMPANY NOT RESPONSIBLE FOR OCTRAY CHARGER OR ANY OTHER CHARGES LEVIED LOCALLYL 4, IN CARE OF CLAIN (LOSE) PROCE OF DOCUMENTS SHOULD BE PRODUCCO INCASE OF LODD OF PACKASE</p>
                            <p style="color: #201d52;">SETTLEMENT WILL BE MADE (20 SA/KOJAS PER COMPANY RULES. 4. COMPANY WILL NOT TAKE RESPONSIBILITY FOR NATURAL CALAMITY AND DELAY IN CUSTORS CLEARANCE</p>
                            <br>
                            <p style="color: #ef1b39;">
                                1.لا يوجد ضمان على أن شركة الزجاج/الأشياء القابلة للكسر ليست مسؤولة عن استلامها في حالة تالفة. 2. لن يتم قبول الشكاوى بعد يومين من تاريخ التسليم 3. الشركة ليست مسؤولة عن شاحن OCTRAY أو أي رسوم أخرى يتم فرضها محليًا 4، في رعاية العميل (الخسارة) يجب أن يتم إنتاج عملية المستندات في حالة تسليم العبوة

    سيتم إجراء التسوية (20 SA/KOJAS لكل قواعد الشركة. 4. لن تتحمل الشركة مسؤولية الكوارث الطبيعية والتأخير في تخليص العملاء
                            </p>
                            <br>
                            <p style="color: #201d52;">ഡെലിവറി ചെയ്യുമ്പോൾ സാധനങ്ങൾ പരിശോധിച്ച് ഉറപ്പ് വരുത്തിയതിന്) സഷോ മാത്രം സ്വീകരിക്കുക</p>
                            <br>
                            <p style="color: #ef1b39;"><b>I AGREE ABOVE TERMS & CONDITIONS </b>  <b>   أوافق على الشروط والأحكام المذكورة أعلاه</b></p>
                        </div>
                        <div class="row pt-3 pb-3 text-center">
                            <div class="col-4" style="color: #201d52;">Shipper Signature</div>
                            <div class="col-4" style="color: #201d52;">Consignee Signature</div>
                            <div class="col-4" style="color: #201d52;">Manager Signature</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>

    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
`,
            });

            console.log('PDF generated at:', uri);

            // Define the file name and destination directory
            const fileName = `${printItem.booking_number}.pdf`;
            const downloadsDirectory = FileSystem.documentDirectory;
            const destinationUri = `${downloadsDirectory}${fileName}`;

            // Move the file to the desired location
            await FileSystem.moveAsync({
                from: uri,
                to: destinationUri,
            });

            console.log('PDF moved to:', destinationUri);

            // Share the file if possible
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(destinationUri);
            } else {
                Alert.alert('Success', 'PDF saved and ready to share');
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            Alert.alert('Error', `Failed to generate PDF: ${error.message}`);
        }
    };

    const handleDeleteBox = async (data) => {
        // Show confirmation alert
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this box?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            const response = await DeleteBox(data);
                            if (response.success) {
                                Toast.success(`${response.message}`)
                                // ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
                                console.log(response);
                                InvoiceDataFetch();
                                handlePrint();
                            } else {
                                // Toast.error(`${response.message}`)
                                ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
                                console.log(response,"err");
                                
                            }
                        } catch (error) {
                            console.log(error);
                            ToastAndroid.show('Network Error !!!', ToastAndroid.LONG);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };
   
  return (
    <View style={{flex:1}}>
        <StatusBar barStyle="light-content" translucent={false} backgroundColor={Color.maincolor} />
      {/* <View style={styles.Imageview}>
      
     </View> */}
    {loading ?(<View style={styles.loader}>
       <ActivityIndicator  size={65} color={Color.maincolor} style={{position:"absolute", top:300,left:165}}/>
    </View>):
     <ScrollView>
     <View style={styles.cstView}>
        <View style={styles.csthead}>
            <Text style={styles.csttexthead}>CUSTOMER</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Mobile</Text>
            <Text style={styles.csttext}>{customer?.phone}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Name</Text>
            <Text style={styles.csttext}>{customer?.name}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Email</Text>
            <Text style={styles.csttext}>{customer?.email}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Address</Text>
            <Text style={styles.csttext}>{customer?.address } </Text>
        </View>
     </View>
     <View style={styles.cstView}>
        <View style={styles.csthead}>
            <Text style={styles.csttexthead}>SENDER</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Mobile</Text>
            <Text style={styles.csttext}>{sender?.phone}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Name</Text>
            <Text style={styles.csttext}>{sender?.name}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Email</Text>
            <Text style={styles.csttext}>{sender?.email}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Address</Text>
            <Text style={styles.csttext}>{sender?.address}</Text>
        </View>
     </View>
     <View style={styles.cstView}>
        <View style={styles.csthead}>
            <Text style={styles.csttexthead}>RECIEVER</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Mobile</Text>
            <Text style={styles.csttext}>{reciever?.phone}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Name</Text>
            <Text style={styles.csttext}>{reciever?.name}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Email</Text>
            <Text style={styles.csttext}>{reciever?.email}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Address</Text>
            <Text style={styles.csttext}>{reciever?.address} </Text>
        </View>
     </View>
     <View style={styles.cstView}>
        <View style={styles.csthead}>
            <Text style={styles.csttexthead}>COLLECTION DETAILS</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Booking Number</Text>
            <Text style={styles.csttext}>{collectiondetails?.booking_no}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Shipment Status</Text>
            <Text style={styles.csttext}>{collectiondetails?.shipment_status}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Driver Name</Text>
            <Text style={styles.csttext}>{collectiondetails?.courier_company}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Shipping Date</Text>
            <Text style={styles.csttext}>{collectiondetails?.shiping_date} </Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Receipt Number</Text>
            <Text style={styles.csttext}>{collectiondetails?.receipt_number} </Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Shipping Method</Text>
            <Text style={styles.csttext}>{collectiondetails?.shipping_method} </Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Number Of pcs</Text>
            <Text style={styles.csttext}>{collectiondetails?.no_of_pcs} </Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Weight</Text>
            <Text style={styles.csttext}>{collectiondetails?.weight} </Text>
        </View>
     </View>
     <View style={styles.cstViewl}>
        <View style={styles.csthead}>
            <Text style={styles.csttexthead}>CHARGES & PAYMENTS</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Payment Method</Text>
            <Text style={styles.csttext}>{charges?.payment_method}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Total Weight</Text>
            <Text style={styles.csttext}>{charges?.total_weight}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Duty</Text>
            <Text style={styles.csttext}>{charges?.duty}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Packing Charges</Text>
            <Text style={styles.csttext}>{charges?.packing_charge}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Add Packing Charge</Text>
            <Text style={styles.csttext}>{charges?.add_packing_charge}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Insurance</Text>
            <Text style={styles.csttext}>{charges?.insurance}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Awb fee</Text>
            <Text style={styles.csttext}>{charges?.awb_fee}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Vat Amount</Text>
            <Text style={styles.csttext}>{charges?.vat_amount}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Volume Weight</Text>
            <Text style={styles.csttext}>{charges?.volume_weight}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Discount</Text>
            <Text style={styles.csttext}>{charges?.discount}</Text>
        </View>
        <View style={styles.mobView}>
            <Text style={styles.csttext}>Total</Text>
            <Text style={styles.csttext}>{charges?.total}</Text>
        </View>
     </View>
    {otherDetails?.boxes.map((item,index)=>(
    <View style={styles.cstViewl} key={index}>
        <View style={styles.btnandboxView}>
       
    <View style={styles.cstheadbox}>
        <Text style={styles.csttexthead}>Box Number : {item.box_name}</Text>
    </View>
    <TouchableOpacity style={styles.deletebtn} onPress={()=>handleDeleteBox(item.box_id)}>
            <Image source={DeleteIcon} style={styles.deltebtnimage}/>
        </TouchableOpacity>
    </View>
    <View style={styles.mobViews} >
        <Text style={styles.csttextbox}>Item</Text>
        <Text style={styles.csttextbox}>quantity</Text>
        <Text style={styles.csttextbox}>price</Text>
        <Text style={styles.csttextbox}>total</Text>
    </View>
    {item?.items.map((data, index) => (
        <View style={styles.mobViews} key={index}>
        <Text style={styles.csttextbox}>{data.name}</Text>
        <Text style={styles.csttextbox}>{data.quantity}</Text>
        <Text style={styles.csttextbox}>{data.price}</Text>
        <Text style={styles.csttextbox}>{data.total}</Text>
    </View>
))}

    </View>
    ))}
     </ScrollView>}
     <View style={styles.bottombar}>
     <TouchableOpacity style={styles.iconview} onPress={()=> navigation.navigate("editinvoice", {data:editData,id:data})}>
            <Image source={Editicon} style={styles.image} />
            <Text style={styles.bottombartext}>Edit</Text>
       </TouchableOpacity>
       <TouchableOpacity style={{marginTop:4}} onPress={()=> navigation.navigate("addbox", {id:boxdata[0].id,data:data})}>
            <Image source={AddBoxIcon} style={styles.image}/> 
            <Text style={styles.bottombartext1}>Add Box</Text>
       </TouchableOpacity> 
       <TouchableOpacity onPress={()=> navigation.navigate("addcalculation", {id:boxdata[0].id})}>
            <Image source={CalculateIcon} style={styles.image}/> 
            <Text style={styles.bottombartext1}>Calculate</Text>
       </TouchableOpacity> 
       <TouchableOpacity onPress={generatePDF}>
            <Image source={Printicon} style={styles.image}/> 
            <Text style={styles.bottombartext}>Print</Text>
       </TouchableOpacity>   
     </View>
    </View>
  )
}

export default Cargoview
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    rows:{
        flexDirection: 'row',
        justifyContent: 'space-around', // Adjust the space between the items as needed
        marginBottom: 10,
    },
    bottombar:{
        height: 50,
        width:windowWidth,
        backgroundColor:Color.Black,
        position:"absolute",
        bottom:0,
        paddingHorizontal:35,  
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-around",

    },
    bottombartext:{
        color:Color.whitecolor,
        fontSize:10,
    },
    bottombartext1:{
        color:Color.whitecolor,
        fontSize:10,
        marginLeft:-10
    },
    mobViews:{
        flex: 1,
        alignItems: 'center',
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:8,
        marginHorizontal:15
    },
    Imageview:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginVertical:15,
        borderWidth:2,
        borderColor:Color.maincolor,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        paddingVertical:10,
        marginHorizontal:10,
    },
    image:{
        height:20,
        width:20
    },
    deletebtn:{
        width:"auto",
        justifyContent:"center",
        alignItems:"center",
        marginRight:20
    },
    btnandboxView:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    deltebtnimage:{
        height:25,
        width:25
    },
    cstView:{
        height:"auto",
        marginHorizontal:10,
        marginVertical:20,
        backgroundColor:Color.maincolor,
        borderRadius:15,
        paddingBottom:10,
    },
    cstViewl:{
        height:"auto",
        marginHorizontal:10,
        marginVertical:20,
        backgroundColor:Color.maincolor,
        borderRadius:15,
        paddingBottom:10,
        marginBottom:75,
    },
    csthead:{
        backgroundColor:Color.whitecolor,
        marginHorizontal:25,
        justifyContent:"center",
        alignItems:"center",
        height:40,
        marginVertical:10,
        borderRadius:15,
    },
    cstheadbox:{
        backgroundColor:Color.whitecolor,
        marginLeft:20,
        justifyContent:"center",
        alignItems:"center",
        height:40,
        width:windowWidth*0.65,
        marginVertical:10,
        borderRadius:15,
    },
    csttexthead:{
        color:Color.Black,
        fontWeight:"900",
    },
    csttext: {
        color: Color.whitecolor,
        fontWeight: "900",
        flexWrap: 'wrap' 
    },
    csttextbox: {
        color: Color.whitecolor,
        width:windowWidth*0.2,
        fontWeight: "900",
        flexWrap: 'wrap' 
    },
    mobView:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:8,
        marginHorizontal:15
    },
})