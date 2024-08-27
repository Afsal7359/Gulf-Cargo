import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


const PDFGenerator = ({ route }) => {
    const { customer, reciever , collectiondetails } = route.params;
    console.log(customer, reciever, "cus,   rec");

    const generatePDF = async () => {
        try {
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

    <button id="printButton" onclick="printPDF()">Print</button><br>
<a href="#" id="btn-Convert-Html2Image" onclick="printTIFF()" class="btn btn-info" style="display:none;">TIFF</a>

    <div id="myElement" >
        <div class="main">
            <section>
                <div class="row" style="height: 156px   ;">
                    <div class="col-6">
                        <img src="" alt="" class="logo_img">
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
                            <h4 class="">SL : TB10101010</h4>
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
                                    <th>: ${customer?.name}</th>
                                </tr>
                                <tr>
                                    <th>ID NO </th>
                                    <th>: ${customer?.document_no}</th>
                                </tr>
                                <tr>
                                    <th>Tel </th>
                                    <th>: ${customer?.phone}</th>
                                </tr>
                                <tr>
                                    <th>No. of Pcs </th>
                                    <th>: ${collectiondetails?.no_of_pcs}</th>
                                </tr>
                                <tr>
                                    <th>Weight </th>
                                    <th>: ${collectiondetails?.weight}</th>
                                </tr>
                                <tr>
                                    <th>Date </th>
                                    <th>: ${collectiondetails?.shiping_date}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="col-6">
                        <table class="shipper_address">
                            <thead>

                                <tr>
                                    <th>Name </th>
                                    <th>:  Afsal</th>
                                </tr>
                                <tr>
                                    <th>Adress </th>
                                    <th>: aaaaa</th>
                                </tr>
                                <tr>
                                    <th>Village </th>
                                    <th>: aaaaa</th>
                                </tr>
                                <tr>
                                    <th>Post </th>
                                    <th>: aaaaaa <span style="margin-left: 22px;">Pin</span> <span>: 101010</span></th>
                                    <!-- <th> </th>
                                    <th></th> -->
                                </tr>
                                <tr>
                                    <th>Dist </th>
                                    <th>:Kottayam <span style="margin-left: 70px;">State</span><span>: Kerala</span></th>
                                    <!-- <th> </td>
                                    <th> </th> -->
                                </tr>
                                <tr>
                                    <th>T </th>
                                    <th>: +91 1010101010 <span style="margin-left: 30px;">M</span> <span> : +91 2020202020</span></th>
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
                                <tr>
                                    <td>1</td>
                                    <td>aaaaa</td>
                                </tr>
                                
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
                                <tr>
                                    <td>2</td>
                                    <td>aaaa</td>
                                </tr>
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
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%;">
                                            <div class="row">
                                                <div class="col-6 text-start">Bill Charges</div>
                                                <div class="col-6 text-end">رسوم الفاتورة</div>
                                            </div>
                                        </td>
                                        <td>
                                            20
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
                                            30
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
                                            100
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
            const fileName = `CargoPrint_${new Date().toISOString().slice(0, 10)}.pdf`;
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

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 50 }}>
                <Button title="Generate PDF" onPress={generatePDF} />
            </View>
        </View>
    );
};

export default PDFGenerator;
