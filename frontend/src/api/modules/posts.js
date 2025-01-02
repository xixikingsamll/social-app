import http from '../http.js';


export const getPostsList =  (data) => {
  const response =  http.post('/community', data);
  return response;
};

export const getPostDetail =  (data) => {
  const response =  http.post('/posts/detail', data);
  return response;
};


export const submitComment = (data) => {
  const response =  http.post('/posts/comment', data);
  return response;
};

export const likePost = (data) => {
  const response =  http.post('/posts/like', data);
  return response;
};


export const sendPost = (data) => {
  const response =  http.post('/posts/send', data);
  return response;
};