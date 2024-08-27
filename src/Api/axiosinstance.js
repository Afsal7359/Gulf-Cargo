import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseURL ="https://gulfcargoksa.cyenosure.co.in/"

const instance = axios.create({
    baseURL:"https://gulfcargoksa.cyenosure.co.in/api/"
})
instance.interceptors.request.use(
    async (config) => {
        try {
            // Retrieve the token from AsyncStorage
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                // Set the token in the Authorization header if it exists
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error fetching token from AsyncStorage:', error);
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default instance;