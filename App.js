import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Screen/Login/Login';
import Home from './src/Screen/Home/Home';
import Cargolist from './src/Screen/Cargo/Cargolist';
import Color from './src/Components/Color';
import Createinvoice from './src/Screen/Invoice/Createinvoice';
import Cargoview from './src/Screen/Cargo/Cargoview';
import CreateCustomer from './src/Components/Creates/CreateCustomer';
import Tracking from './src/Screen/Tracking/Tracking';
import TrackingSearch from './src/Screen/Tracking/TrackingSearch';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        
    <Stack.Navigator>
  
  
        <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Tracking" component={Tracking} options={{headerShown:false,}}/>
        <Stack.Screen name="TrackingSearch" component={TrackingSearch} options={{headerShown:true,headerTintColor:"#fff",headerTitle:"", headerStyle:{backgroundColor:Color.maincolor}}}/>
        <Stack.Screen name="cargolist" component={Cargolist} options={{headerShown:true,headerTintColor:"#fff",headerTitle:"", headerStyle:{backgroundColor:Color.maincolor}}}/>
        <Stack.Screen name="createinvoice" component={Createinvoice} options={{headerShown:true,headerTintColor:"#fff",headerTitle:"", headerStyle:{backgroundColor:Color.maincolor}}}/>
        <Stack.Screen name="cargoview" component={Cargoview} options={{headerShown:true,headerTintColor:"#fff",headerTitle:"", headerStyle:{backgroundColor:Color.maincolor}}}/>
        <Stack.Screen name="Addcustomer" component={CreateCustomer} options={{headerShown:true,headerTintColor:"#fff",headerTitle:"Create Customer", headerStyle:{backgroundColor:Color.maincolor}}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

