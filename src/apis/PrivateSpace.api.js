/* eslint-disable no-unused-expressions */
import axios from "./axios";

export async function getPrivateSpaceList(){
    try {
        const response = await axios.get(`/privateSpace`);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}

export async function getPrivateSpace(PrivateSpaceProps){
    const {privateSpaceUUID} =PrivateSpaceProps;
    try {
        const response = await axios.get(`/privateSpace/`+privateSpaceUUID);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}
