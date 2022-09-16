import axios from "./axios";

export async function createNotice(CreateNoticeProps){
    try {
        await axios.post(`/notices`, CreateNoticeProps);  
        return {success: true, error: undefined };
      } catch (error) {
        return {success: false, error };
      }
}

export async function checkChatRoomPassword(ChatRoomPasswordProps){
    
    const {noticeId,password} =ChatRoomPasswordProps;
    console.log(ChatRoomPasswordProps);
    try {
        await axios.post(`/notices/`+ noticeId,{"password" : password});  
        return {success: true, error: undefined };
      } catch (error) {
        return {success: false, error };
      }
}

export async function getNoticeDetail(noticeId){
    try {
        const response = await axios.get(`/notices/`+noticeId);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}

export async function getNoticeList(){
    try {
        const response = await axios.get(`/notices`);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}

export async function getMyInterestsNoticeList(myInterests){
  try {
      const response = await axios.get(`/notices?interest=`+myInterests[0]+`,`+myInterests[1]+`,`+myInterests[2]);  
      return {response: response.data, success: true, error: undefined };
    } catch (error) {
      return {response: null, success: false, error };
    }
}

export async function getSearchByNoticeTitle(enteredTitle){

  try {
      const response =await axios.get(`/notices?subject=`+enteredTitle);
      return {response: response.data, success: true, error: undefined };
    } catch (error) {
      return {success: false, error };
    }
}
