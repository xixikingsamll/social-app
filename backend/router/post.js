const express = require('express')
const router = express.Router()

// 引入router_handler里的用户处理函数
const post_handler = require('../router_handler/post')

router.post('/send', post_handler.sendPosts)


module.exports = router 