const express = require('express')
const router = express.Router()

// 引入router_handler里的用户处理函数
const post_handler = require('../router_handler/post')

router.post('/send', post_handler.sendPosts)
router.post('/edit', post_handler.editPostPage)
router.post('/detail', post_handler.getPostDetail)
router.post('/comment', post_handler.postComment)
router.post('/like', post_handler.likePost)

module.exports = router 