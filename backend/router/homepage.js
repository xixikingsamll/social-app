const express = require('express')
const router = express.Router()

// 引入router_handler里的用户处理函数
const homepage_handler = require('../router_handler/homepage')

router.get('/',  homepage_handler.homepage)

router.post('/chat',homepage_handler.createChat)


module.exports = router 