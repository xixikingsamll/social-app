const express = require('express')
const router = express.Router()

const userinfo_handler = require('../router_handler/userinfo')

// 导入验证规则
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 获取用户信息
router.get('/userinfo', userinfo_handler.getUserinfo)

// 更新用户信息
router.post('/updateuserinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserinfo)

// 重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePwd)

// 换头像
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router