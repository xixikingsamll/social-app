const db = require('../db/index')

exports.sendPosts = async (req, res) => {
    try {
        const postInfo = req.body;//user_id,title,content,timestamp
        if (!postInfo.id) {
            return res.status(400).json({
                success: 'false',
                message: '缺少用户id参数'
            });
        }
        if (!postInfo.title || !postInfo.content) {
            return res.status(400).json({
                success: "false",
                message: "标题或正文不能为空"
            })
        }
        if (!postInfo.timestamp) {
            return res.status(400).json({
                success: "false",
                message: "缺少时间戳参数"
            })
        }

        const sqlInsertPost = `INSERT INTO post (user_id, title, content, created_at)VALUES (?, ?, ?, ?)`;

        await queryAll(sqlInsertPost, [postInfo.id, postInfo.title, postInfo.content, postInfo.timestamp]);

        return res.status(201).json({
            success: true,
            message: '帖子创建成功'
        });

    } catch (error) {

    }
}
async function queryAll(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('SQL 执行出错:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}
