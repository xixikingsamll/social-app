import { login, register, getUserInfo, updateUserInfo, getPersonDetail } from './modules/user.js';
import { getPostsList, getPostDetail, submitComment, likePost, sendPost } from './modules/posts.js';
import { getInformationList, getChatList,createChat,getChatId } from './modules/information.js';

// 统一导出所有模块的API，方便外部导入使用
export {
  login,
  register,
  getPostsList,
  getInformationList,
  getChatList,
  getUserInfo,
  updateUserInfo,
  getPostDetail,
  submitComment,
  likePost,
  sendPost,
  getPersonDetail,
  createChat,
  getChatId,
};