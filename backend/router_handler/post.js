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

exports.likePost = async (req, res) => {
    try {
        const { id, postid } = req.body; // 获取请求体中的用户ID和帖子ID

        // 校验用户ID和帖子ID
        if (!id || !postid) {
            return res.status(400).json({
                success: false,
                message: '用户ID和帖子ID不能为空'
            });
        }

        // 校验帖子是否存在 const postQuery = 'SELECT * FROM posts WHERE postid = ?'; // 查询帖子是否存在 const post = await queryAll(postQuery, [postid]);
        if (post.length === 0) {
            return res.status(404).json({
                success: false,
                message: '帖子未找到'
            });
        }

        // 查询用户是否已经点赞 const likeCheckQuery = 'SELECT * FROM likes WHERE user_id = ? AND post_id = ?';
        const likes = await queryAll(likeCheckQuery, [id, postid]); // 直接查询数据库 
        if (likes.length > 0) {
        return res.status(400).json({
            success: false,
            message: '您已经点赞过此帖子'
        });
    }
        // 更新点赞数
        const updatedPostQuery = 'UPDATE posts SET likes = likes + 1 WHERE postid = ?';

   

        await queryAll(updatedPostQuery, [postid]); // 增加帖子点赞数 // 记录用户点赞
        const insertLikeQuery = 'INSERT INTO likes (user_id, post_id) VALUES (?, ?)';
        await queryAll(insertLikeQuery, [id, postid]); // 记录用户点赞 // 返回成功响应 
        res.status(200).json({
            success: true,
            message: "点赞成功"
        })
    } catch (error) {
        console.error('点赞失败:', error);
        res.status(500).json({
            success: false,
            message: '服务器错误，请稍后重试'
        });
    }
}