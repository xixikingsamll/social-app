const express = require('express')
const router = express.Router()

const category_handler = require('../../router_handler/adminServer/category')
const expressJoi = require('@escook/express-joi')
const { add_category_schema, edit_category_schema } = require('../../schema/category')

// 获取分类列表
router.get('/api/get/category', category_handler.getCategory)

// 創建新分類
router.post('/admin/add/category', expressJoi(add_category_schema), category_handler.addCategory)

// 刪除分類
router.delete('/admin/delete/category/:id', category_handler.deleteCategory)

// 编辑分类
router.put('/admin/edit/category/:id', expressJoi(edit_category_schema), category_handler.editCategory)

module.exports = router