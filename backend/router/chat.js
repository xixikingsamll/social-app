const express = require('express')
const router = express.Router()

// 引入router_handler里的用户处理函数
const chat_handler = require('../router_handler/chat')

router.post('/', chat_handler.getChatDetail)


module.exports = router 