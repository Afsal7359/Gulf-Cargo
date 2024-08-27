import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Screen/Login/Login';
import Home from './src/Screen/Home/Home';
import Cargolist from './src//Screen/Cargo/Cargolist';
import Color from './src/Components/Color';
import Createinvoice from './src/Screen/Invoice/Createinvoice';
import Cargoview from './src/Screen/Cargo/Cargoview';
import CreateCustomer from './src/Components/Creates/CreateCustomer';
import Tracking from './src/Screen/Tracking/Tracking';
import TrackingSearch from './src/Screen/Tracking/TrackingSearch';
import ToastProvider from 'toastify-react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Addbox from './src/Screen/Cargo/Box/Addbox';
import Calculation from './src/Screen/Cargo/Box/Calculation';
import Sender from './src/Screen/Sender/Sender';
import Reciever from './src/Screen/Reciever/Reciever';
import { Provider } from 'react-redux';
import { store } from './src/Components/Redux/store';
import CargoPrint from './src/Screen/Cargo/CargoPrint';
import Editinvoice from './src/Screen/Invoice/Editinvoice';


const Stack = createNativeStackNavigator();

export default function App({navigation}) {

     const token = AsyncStorage.getItem('authToken');
   
 
  
  return (
    <>
       <Provider store={store}>
    <NavigationContainer>
 
    <Stack.Navigator>
  
  
       {token ?  <Stack.Screen name="home" component={Home} options={{headerShown:false}}/>:
       <Stack.Screen name="login"  component={Login} options={{headerShown:false}}/>}
        <Stack.Screen name="login"  component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Tracking" component={Tracking} options={{headerShown:false,}}/>
        <Stack.Screen name="TrackingSearch" component={TrackingSearch} options={{headerShown:true,headerTintColor:"#fff",headerTitle:"", headerStyle:{backgroundColor:Color.maincolor}}}/>
        <Stack.Screen name="cargolist" component={Cargolist} options={{headerShown:false}}/>
        <Stack.Screen name="createinvoice" component={Createinvoice} options={{headerShown:true,headerTintColor:"#fff",headerTitle:"", headerStyle:{backgroundColor:Color.maincolor}}}/>
        <Stack.Screen name="editinvoice" component={Editinvoice} options={{headerShown:true,headerTintColor:"#fff",headerTitle:"", headerStyle:{backgroundColor:Color.maincolor}}}/>
        <Stack.Screen name="cargoview" component={Cargoview} options={{headerShown:true,headerTintColor:"#fff",headerTitle:"", headerStyle:{backgroundColor:Color.maincolor}}}/>
        <Stack.Screen name="Addcustomer" component={CreateCustomer} options={{headerShown:true,headerTintColor:"#fff",headerTitle:"Create Customer", headerStyle:{backgroundColor:Color.maincolor}}}/>

        <Stack.Screen name="addbox" component={Addbox} options={{headerShown:false}}/>
        <Stack.Screen name="addcalculation" component={Calculation} options={{headerShown:false}}/>
        <Stack.Screen name="sender" component={Sender} options={{headerShown:false}}/>
        <Stack.Screen name="reciever" component={Reciever} options={{headerShown:false}}/>
        <Stack.Screen name="print" component={CargoPrint} options={{headerShown:false}}/>

      </Stack.Navigator>
    
    </NavigationContainer>
    </Provider>
    <ToastProvider />
        </>
  );
}

