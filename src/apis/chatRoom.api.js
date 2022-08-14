import axios from "./axios";

export async function createChatRoom(CreateChatRoomProps){
    try {
        const response = await axios.post(`/chatRooms/create/avatar`, CreateChatRoomProps);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}

export async function enterChatRoom(ChatRoomUUID){
    try {
        await axios.post('/chatRooms/'+ChatRoomUUID+'/enter');  
        return {success: true, error: undefined };
      } catch (error) {
        return {success: false, error };
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

getChatRoom