import http from '../http.js';
import { jwtDecode } from 'jwt-decode';


export const login =async (data) => {
  const response =await  http.post('/api/login', data);
  const { token } = response;
  if (token) {
    localStorage.setItem('token',token);
    const decodedToken = jwtDecode(token);
    // 解码token，因为他们后端没有写，要直接传id，涉及id可以直接在这拿
    localStorage.setItem('userInfo',JSON.stringify(decodedToken));
  }
  return response;
};

export const register =  (data) => {
  const response =  http.post('/api/register', data);
  return response;
};

