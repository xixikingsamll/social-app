const express = require('express')
const router = express.Router()

// 引入router_handler里的用户处理函数
const community_handler = require('../router_handler/community')

router.get('/', community_handler.getCommunity)

module.exports = router 