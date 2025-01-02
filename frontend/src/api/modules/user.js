import http from '../http.js';
import { jwtDecode } from 'jwt-decode';


export const login = async (data) => {
  const response = await http.post('/api/login', data);
  const { token } = response;
  if (token) {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    // 解码token，因为他们后端没有写，要直接传id，涉及id可以直接在这拿
    localStorage.setItem('userInfo', JSON.stringify(decodedToken));
  }
  return response;
};

export const register = (data) => {
  const response = http.post('/api/register', data);
  return response;
};

export const getUserInfo =async (data) => {
  const basicInfo =await http.get('/my/userinfo', data);
  const posts = await http.post('/homepage', data);
  
  const res = {
    ...basicInfo.data,
    posts:posts.data.posts
  }
  return res;
};

export const updateUserInfo = (data) => {
  const response = http.get('/my/userinfo', data);
  return response;
};

// export const getUserInfo = (data) => {
//   const response = http.post('/homepage', data);
//   return response;
// };

