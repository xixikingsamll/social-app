const express = require('express')
const router = express.Router()

const admin_handler = require('../../router_handler/adminServer/login')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../../schema/user')

// 登录接口
router.post('/login', expressJoi(reg_login_schema), admin_handler.adminLogin)

module.exports = router