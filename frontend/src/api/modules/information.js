import http from '../http.js';


export const getInformationList = (data) => {
    const response = http.post('/message', data);
    return response;
};

export const getChatList = (data) => {
    const response = http.post('/chat', data);
    return response;
};

export const createChat = (data) => {
    const response = http.post('/homepage/chat', data);
    return response;
};

export const getChatId = (data) => {
    const response = http.post('/homepage/getChatId', data);
    return response;
};