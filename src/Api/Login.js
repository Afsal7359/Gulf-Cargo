import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "./axiosinstance"


export const LoginApi = async(payload)=>{
    try {
        const response = await instance.post('login',payload);
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const Logout = async()=>{
    try {
        const response= await instance.post('logout');
        return response.data
    } catch (error) {
        return error.response.data
    }
}
