const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户信息模块
exports.getUserinfo = (req, res) => {
    // 通过id查找用户信息，不包括密码
    const sqlSearch = `select id, username, nickname, email, avartar from user where id=?`
    db.query(sqlSearch, req.auth.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败')
        // 获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
        
    })
}

// 更新用户信息的模块
exports.updateUserinfo = (req, res) => {
    // 通过id更新用户的信息
    const sqlUpdate = `update user set ? where id=?`
    db.query(sqlUpdate, [req.body, req.auth.id], (err, results) => { 
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新用户信息失败')
        res.cc('更新用户信息成功', 0)
    })
}

// 重置密码的模块
exports.updatePwd = (req, res) => {
    const sqlSearch = `select * from user where id=?`
    db.query(sqlSearch, req.auth.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在')
        
        // 判断密码是否正确
        if (!bcrypt.compareSync(req.body.oldPwd, results[0].password)) return res.cc('原密码错误')
        
        // 密码正确，更新密码
        const sqlUpdate = `update user set password=? where id=?`
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sqlUpdate, [newPwd, req.auth.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败')
            res.cc('更新密码成功', 0)
        })
    })
}

// 换头像模块
exports.updateAvatar = (req, res) => {
    const sqlUpdate = `update user set avartar=? where id=?`
    db.query(sqlUpdate, [req.body.avatar, req.auth.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新头像失败')
        res.cc('更新头像成功', 0)
    })
}