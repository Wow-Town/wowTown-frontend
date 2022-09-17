import axios from 'axios';
import {history} from '../utils/History';

const instance = axios.create({
  baseURL: 'http://api.wowTown.co.kr:81',
  withCredentials: true,
  headers: {
    Authorization : `${localStorage.getItem('accessToken')}`
    }
});

instance.interceptors.request.use(function (request) {
    const token = localStorage.getItem('accessToken');
    request.headers.Authorization = token;
  
    return request;
  });

instance.interceptors.response.use(
    function (response) {
        console.log(response);
        if(response.config.url === "/login"){
            const { accessToken } = response.data;
            localStorage.setItem('accessToken',  accessToken );
            instance.defaults.headers.common["Authorization"] =accessToken;
        }
        const newAccessToken = response.headers.authorization;
        if(newAccessToken !== undefined){
            instance.defaults.headers.common["Authorization"] =newAccessToken;
            localStorage.setItem('accessToken',  newAccessToken );
        }
    return response
},
async function (error) {
  if (error.response && error.response.status === 401) {
        try {
            console.log("토큰 만료 로그아웃");
            localStorage.clear();
            history.replace("/");
      
      } catch (error){
          console.log("에러");
      }
      return Promise.reject(error)
  }
  return Promise.reject(error)
})

export default instance;