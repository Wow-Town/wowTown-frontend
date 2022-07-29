import axios from "./axios";

export async function signUp(SignUpProps){
    const { email, userName, password} = SignUpProps;
    try {
        await axios.post(`/signUp`, {email,userName,password});
        return {success: true, error: undefined };
      } catch (error) {
        return {success: false, error };
      }
}


export async function login(LoginProps){
    const { email, password} = LoginProps;
    try {
        const response = await axios.post(`/login`, {email,password});
        return {response: response.data, success: true, error: undefined };
      } catch (error) {
        return {response: null, success: false, error };
      }
}