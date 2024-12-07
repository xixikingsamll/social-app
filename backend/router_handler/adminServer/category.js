const db = require('../../db/index')

// 获取分类
exports.getCategory = (req, res) => {
    const sql = `SELECT * FROM article_category`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取分类成功',
            data: results
        })
    })
}

// 添加分类
exports.addCategory = (req, res) => {
    const sql = `INSERT INTO article_category (name, discription) VALUES (?, ?)`
    db.query(sql, [req.body.name, req.body.discription], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('添加分类失败')
        res.cc('添加分类成功', 0)
    })
}

// 删除分类
exports.deleteCategory = (req, res) => {
    const categoryID = req.params.id
    const sql = `DELETE FROM article_category WHERE id = ?`
    db.query(sql, categoryID, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除分类失败')
        res.cc('删除分类成功', 0)
    })
}   

// 编辑分类
exports.editCategory = (req, res) => {
    const categoryID = req.params.id
    const sql = `UPDATE article_category SET name = ?, discription = ? WHERE id = ?`
    db.query(sql, [req.body.name, req.body.discription, categoryID], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('编辑分类失败')
        res.cc('编辑分类成功', 0)
    }) 
}