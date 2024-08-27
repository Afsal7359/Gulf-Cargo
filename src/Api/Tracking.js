import instance from "./axiosinstance"

export const GetTracking = async(payload)=>{
    try {
        const response = await instance.post('tracking' , payload);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}