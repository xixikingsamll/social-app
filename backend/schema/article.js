const joi = require('joi')

// 定义文章的验证规则
const name = joi.required()
const author = joi.required()
const content = joi.required()
const title = joi.required()

// 新建文章的规则
exports.add_article_schema = joi.object({
    name,
    author,
    content,
    title
})

exports.edit_article_schema = joi.object({
    name,
    author,
    content,
    title
})