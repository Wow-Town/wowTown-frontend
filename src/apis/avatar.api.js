import axios from "./axios";

export async function getAvatar(){
    try {
        const response = await axios.get(`/avatars`);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}

export async function createAvatar(AvatarProps){
    try {
        const response = await axios.post(`/avatars`,AvatarProps);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}