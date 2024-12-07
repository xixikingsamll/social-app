// 引入数据库
const db = require('../db/index')

// 引入密码明文加密
const bcrypt = require('bcryptjs')

// 引入生成token的包
const jwt = require('jsonwebtoken')
const config = require('../config')

// 注册的函数
exports.register = (req, res) => {
    // 获取用户提交的数据
    const userinfo = req.body

    // 查询数据库中是否已有该用户名
    const sqlSearchUsername = `select * from user where username=?`
    db.query(sqlSearchUsername, userinfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc('用户名已被占用')
        }

        // 密码明文加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        // 插入新用户
        const sqlInsertUser = `insert into user set ?`
        db.query(sqlInsertUser, userinfo, (err, results) => {
            if (err) {
                return res.cc(err)  
            }
            if (results.affectedRows !== 1) {
                return res.cc('注册失败')
            }
            res.cc('注册成功', 0)
        })
    })
}

// 登录的函数   
exports.login = (req, res) => {
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

