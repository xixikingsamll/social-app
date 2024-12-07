const db = require('../../db/index')

// 获取所有文章及其内容
exports.getArticle = (req, res) => {
    const categoryID = req.query.category_id
    if (categoryID != 0) {
        const sql = `select * from article where category_id=?`
        db.query(sql, categoryID, (err, results) => {
            if (err) return res.cc(err)
            if (results.length === 0) return res.cc('获取文章失败')

            res.send({ status: 0, message: '获取文章成功', data: results })
        })
    }else{
        const sql = 'select * from article'
        db.query(sql, (err, results) => { 
            if (err) return res.cc(err)
            if (results.length === 0) return res.cc('获取文章失败')

            res.send({ status: 0, message: '获取文章成功', data: results })
        })
    }
}

// 获取对应id的文章内容
exports.getArticleById = (req, res) => {
    const articleID = req.params.id
    console.log(articleID);
    const sql = `select * from article where id=?`
    db.query(sql, articleID, (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('获取文章失败')
        res.send({ status: 0, message: '获取文章成功', data: results })
    })
}

// 创建新文章
exports.createArticle = (req, res) => {
    const sql = `insert into article (title, content, author, category_id, create_time, update_time) VALUES (?, ?, ?, ?, ?, ?)`
    db.query(sql, [req.body.title, req.body.content, req.body.author , req.body.category_id, req.body.create_time, req.body.update_time], (err, results) => {
        if (err) return res.cc(err) 
        if (results.affectedRows !== 1) return res.cc('创建文章失败')

        res.cc('创建文章成功', 0)
    })
}

// 修改現有文章内容
exports.updateArticle = (req, res) => {
    const articleID = req.params.id
    const sql = `update article set title=?, content=?, author=?, category_id=?, update_time=? where id=?`
    db.query(sql, [req.body.title, req.body.content, req.body.author, req.body.category_id, req.body.update_time, articleID], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改文章失败')
        res.cc('修改文章成功', 0)
    })
}

// 刪除文章
exports.deleteArticle = (req, res) => {
    const articleID = req.params.id
    const sql = `delete from article where id=?`
    db.query(sql, articleID, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章失败')
        res.cc('删除文章成功', 0)
    })
}