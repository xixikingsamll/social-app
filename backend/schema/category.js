const joi = require('joi')

// 定义分类的验证规则
const name = joi.required()
const discription = joi.required()

// 新建分类的规则
exports.add_category_schema = joi.object({
    name,
    discription
})

// 编辑分类的规则
exports.edit_category_schema = joi.object({
    name,
    discription
})