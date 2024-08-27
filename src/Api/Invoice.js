import instance from "./axiosinstance"
import AsyncStorage from '@react-native-async-storage/async-storage';


export const GetBookingNumber = async()=>{
    try {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoString);
        const branch_id = userInfo?.branch_id;
        const branch_code = userInfo?.branch_code;
        const response = await instance.get(`createInvoice?branch_id=${branch_id}&branch_code=${branch_code}`);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const GetBranchList = async()=>{
    try {
        const response = await instance.get('getAllBranches');
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const GetAllsender = async()=>{
    try {
        const response = await instance.get('getAllSender');
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const GetAllReciever = async()=>{
    try {
        const response = await instance.get('getAllReceiver');
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const GetAllCourierCompany = async()=>{
    try {
        const response = await instance.get("getAllCourierCompany")
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const GetShippingMethod = async()=>{
    try {
        const response= await instance.get('shippingMethods');
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const GetPaymentMethod = async()=>{
    try {
        const response = await instance.get('paymentMethod');
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const GetStatusData = async()=>{
    try {
        const response = await instance.get('getAllStatuses');
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const GetAllCollectedBy = async()=>{
    try {
        const response = await instance.get('collectedBy');
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const GetDriversByBranchId = async()=>{
    try {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoString);
        const branch_id = userInfo?.branch_id;
        const response = await instance.get(`getAllDrivers?branch_id=${branch_id}`);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const GetStaffByBranchId = async()=>{
    try {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoString);
        const branch_id = userInfo?.branch_id;
        const response = await instance.get(`getAllStaffs?branch_id=${branch_id}`);
        return response.data;
    } catch (error) {
        return response.data
    }
}
export const CreateInvoice = async(payload)=>{
    try {
        const response = await instance.post('storeInvoice',payload)
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const EditInvoiceApi = async(payload)=>{
    try {
        const response = await instance.post('updateInvoice',payload);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const GetAllInvoice = async(payload)=>{
    try {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoString);
        const branch_id = userInfo?.branch_id;  
        const response= await instance.get(`listInvoice?branch_id=${branch_id}&page=${payload}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const AddCalculation = async(payload)=>{
    try {
        const response = await instance.post('calculation',payload);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const GetCalculation =async(payload)=>{
    try {
        const response = await instance.get(`listCalculations?shipment_id=${payload}`)
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const ViewInvoice = async(payload)=>{
    try {
        const response = await instance.get(`invoiceView?inv_id=${payload}`);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const PrintInvoice = async(payload)=>{
    try {
        const response = await instance.get(`print/${payload}`);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
