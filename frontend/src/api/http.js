import axios from 'axios';

// 创建axios实例


const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // 从环境变量中获取API的基地址，你需要在项目的.env文件中配置相应变量，例如：VUE_APP_API_BASE_URL = 'https://api.example.com'
  timeout: 5000 // 请求超时时间设置为5秒
});

// 请求拦截器，可用于添加请求头信息等，比如添加token
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // 假设从本地存储获取token，实际根据你的认证方式来定
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器，可用于处理响应的统一逻辑，比如对错误状态码进行处理
instance.interceptors.response.use(
  response => {
    console.log('from http: ',response);
    
    return response.data; // 通常返回响应中的数据部分，具体根据后端接口返回格式来定
  },
  error => {
    // 可以在这里根据不同的错误状态码做相应提示或者处理逻辑
    if (error.response && error.response.status === 401) {
      // 比如401错误，可能是token过期，进行相应操作，如跳转到登录页等
      console.log('Token expired, please login again');
    }
    return Promise.reject(error);
  }
);

export default instance;