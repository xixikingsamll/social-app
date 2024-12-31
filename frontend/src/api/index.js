import { login, register } from './modules/user.js';
import { getPostsList } from './modules/posts.js';

// 统一导出所有模块的API，方便外部导入使用
export {
  login,
  register,
  getPostsList,
};