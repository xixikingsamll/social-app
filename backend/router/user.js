const express = require('express')
const router = express.Router()

// 引入router_handler里的用户处理函数
const user_handler = require('../router_handler/user')

// 引入验证规则中间件
const expressJoi = require('@escook/express-joi')
// 引入验证规则
const { reg_login_schema } = require('../schema/user')


router.post('/register', expressJoi(reg_login_schema), user_handler.register)

router.post('/login', expressJoi(reg_login_schema), user_handler.login)

module.exports = router 