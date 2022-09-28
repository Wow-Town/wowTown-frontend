/* eslint-disable no-unused-expressions */
import axios from "./axios";

export async function createChatRoom(CreateChatRoomProps){
    try {
        const response = await axios.post(`/chatRooms/create/avatar`, CreateChatRoomProps);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}

export async function getChatRoomList(){
    try {
        const response = await axios.get(`/chatRooms`);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}

export async function getChatRoom(chatRoomUUID){
    try {
        const response = await axios.get(`/chatRooms/`+chatRoomUUID);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}

export async function uploadFile(UploadFileProps){
    const {chatRoomId,formData} =UploadFileProps;
    console.log(formData);
    try {
        const response = await axios.post('/chatRooms/'+chatRoomId+'/upload',formData,{headers:{"content-type":"multipart/form-data"}});  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}