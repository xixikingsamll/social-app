const express = require('express')
const router = express.Router()

const article_handler = require('../../router_handler/adminServer/article')
const expressJoi = require('@escook/express-joi')
const { add_article_schema, edit_article_schema } = require('../../schema/article')

// 获取所有文章以及其相关的所有内容
router.get('/api/article', article_handler.getArticle)

// 获取对应ID的文章内容
router.get('/api/article/:id', article_handler.getArticleById)

// 创建新文章
router.post('/admin/add/article', expressJoi(add_article_schema), article_handler.createArticle)

// 修改現有文章内容
router.put('/admin/update/article/:id', expressJoi(edit_article_schema), article_handler.updateArticle)

// 删除文章
router.delete('/admin/delete/article/:id', article_handler.deleteArticle)

module.exports = router