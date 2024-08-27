import instance from "./axiosinstance";

export const CreateBox = async(payload)=>{
    try {
        const response = await instance.post('createBox',payload);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const UpdateBox = async(payload)=>{
    try {
        const response= await instance.post('updateBox',payload);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const DeleteBox = async(payload)=>{
    try {
        const response = await instance.get(`deleteBox?box_id=${payload}`);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}
export const GetBoxes = async(payload)=>{
    try {
        const response = await instance.get(`listBoxes?shipment_id=${payload}`);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}