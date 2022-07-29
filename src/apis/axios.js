import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.wowtown.co.kr:81',
  withCredentials: true,
});

export default instance;