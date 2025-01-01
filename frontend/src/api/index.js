import { login, register } from './modules/user.js';
import { getPostsList } from './modules/posts.js';
import { getInformationList, getChatList } from './modules/information.js';

// 统一导出所有模块的API，方便外部导入使用
export {
  login,
  register,
  getPostsList,
  getInformationList,
  getChatList
};