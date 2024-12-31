import http from '../http.js';


export const getInformationList = (data) => {
    const response = http.post('/message', data);
    return response;
};