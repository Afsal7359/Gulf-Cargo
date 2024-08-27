import instance from "./axiosinstance"

export const GetCountries =async()=>{
    try {
        const response=await instance.get("countrys");
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const GetStates =async(payload)=>{
    try {
        const response = await instance.get(`states?country_id=${payload}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const GetDistricts=async(payload)=>{
    try {
        const response =await instance.get(`districts?state_id=${payload}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const AddSenderapi= async(payload)=>{
    try {
        const response = await instance.post("createCustomer", payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
        return response.data;
    } catch (error) {
        return error.response.data
    }
}