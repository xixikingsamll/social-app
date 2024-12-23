const express = require('express')
const router = express.Router()

// 引入router_handler里的用户处理函数
const message_handler = require('../router_handler/message')

router.get('/', message_handler.getMessage)

module.exports = router 