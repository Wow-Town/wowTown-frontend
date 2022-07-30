import axios from "./axios";

export async function getChannelList(){
    try {
        const response = await axios.get(`/channels`);  
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}

export async function enterChannel(ChannelProps){
    const channelId  = ChannelProps;
    try {
        await axios.post('/channels',{"channelId":channelId});
        return { success: true, error: undefined };
      } catch (error) {
        return { success: false, error };
      }
}
