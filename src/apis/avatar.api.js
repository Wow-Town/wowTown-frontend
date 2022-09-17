import axios from "./axios";

export async function getAvatar(){
    try {
        const response = await axios.get(`/avatars`);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}

export async function getAvatarById(avatarId){
    try {
        const response = await axios.get(`/avatars/`+avatarId);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}

export async function getAvatarFriendList(){
    try {
        const response = await axios.get(`/avatars/friends`);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}

export async function createAvatar(AvatarProps){
    try {
        await axios.post(`/avatars`,AvatarProps);  
        return {success: true, error: undefined };
      } catch (error) {
        return {success: false, error };
      }
}

export async function addFriend(RequestProps){
    const {friendAvatarId} =RequestProps;
    try {
        await axios.post(`/avatars/friends/add`,{"friendAvatarId": friendAvatarId});  
        return { success: true, error: undefined };
      } catch (error) {
        return { success: false, error };
      }
}

export async function approveFriendRequest(RequestProps){
    const {friendAvatarId} =RequestProps;
    try {
        await axios.post(`/avatars/friends/approve`,{"friendAvatarId": friendAvatarId});  
        return { success: true, error: undefined };
      } catch (error) {
        return { success: false, error };
      }
}

export async function rejectFriendRequest(RequestProps){
    const {friendAvatarId} =RequestProps;
    try {
        await axios.post(`/avatars/friends/reject`,{"friendAvatarId": friendAvatarId});  
        return { success: true, error: undefined };
      } catch (error) {
        return { success: false, error };
      }
}