// 引入数据库
const db = require('../../db/index')

// 引入密码明文加密
const bcrypt = require('bcryptjs')

// 引入生成token的包
const jwt = require('jsonwebtoken')
const config = require('../../config')

exports.adminLogin = (req, res) => {
    // 获取用户提交的数据
    const userinfo = req.body

    // 查询是否有该用户
    const sqlSearchUsername = `select * from user where username=?`
    db.query(sqlSearchUsername, userinfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) {
            return res.cc('用户不存在')
        }
        if (results[0].is_admin !== 1)
            return res.cc('不好意思，您的账号并没有管理员权限')

        // 判断密码是否正确
        if (!bcrypt.compareSync(userinfo.password, results[0].password)) {
            return res.cc('密码错误')
        }

        // 生成token
        const user = { ...results[0], password:'', avartar:'' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    })
}