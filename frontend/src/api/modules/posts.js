import http from '../http.js';


export const getPostsList =  (data) => {
  const response =  http.post('/community', data);
  return response;
};