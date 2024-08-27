import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

const isTokenExpired = async () => {
    try {
      const expiry = await AsyncStorage.getItem('tokenExpiry');
      if (!expiry) return true;
  
      const expiryDate = parseInt(expiry, 10);
      const now = new Date().getTime();
      return now > expiryDate;
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true;
    }
  };
  
 export const checkTokenAndProceed = async (navigation,page) => {
    const expired = await isTokenExpired();
    if (expired) {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('tokenExpiry');
        navigation.replace('login');
        ToastAndroid.show("Login Expired !! Please Login Once more",ToastAndroid.LONG)
    } else {
      
      // Token is still valid, proceed with the app
      // navigation.replace(`${page}`);
      if(page){
        navigation.replace(`${page}`);
      }else{
        const token = await AsyncStorage.getItem('authToken');
        return token;
      }
     
    }
  };
  