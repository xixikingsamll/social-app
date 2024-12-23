const joi = require('joi')

// 定义验证规则
const username = joi.string().alphanum().min(1).max(30).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const id = joi.number().integer().min(1).required()
const nickname = joi.string().min(1).max(30).required()
const email = joi.string().email().required()
const avatar = joi.string().dataUri().required()

// 注册登录的规则
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// 修改个人信息的规则
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

// 重置密码的规则
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 换头像的规则
exports.update_avatar_schema = {
    body: {
        avatar
    }
}