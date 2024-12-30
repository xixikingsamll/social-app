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
        res.status(500).json({
            success: false,
            message: '服务器错误，请稍后重试'
        });
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

const dbapiPost = require('../../dbapi/database/post'); // 引入动态数据库操作模块
const dbapiUser = require('../../dbapi/database/user'); // 引入用户数据库操作模块
const dbapiComment = require('../../dbapi/database/comment'); // 引入评论数据库操作模块
const dbapiLike = require('../../dbapi/database/like'); // 导入点赞数据库操作模块



// 进入动态编辑页,注：这个接口应该不需要，前端直接跳转
exports.editPostPage = async (req, res) => {
    try {
        // 从请求参数中获取用户ID
        const userId = parseInt(req.body.id);

        // 校验用户ID
        if (isNaN(userId)) {
            return res.status(400).json({
                success: false,
                message: '用户ID必须为有效的整数'
            });
        }

        // 查询用户信息，以确保该用户存在
        const userInfo = await dbapiUser.queryUser(userId); // 从 user.js 中查询用户

        if (userInfo.length === 0) {
            return res.status(404).json({
                success: false,
                message: '用户未找到'
            });
        }

        // 返回简化的成功响应
        res.status(200).json({
            success: true,
            message: '获取动态编辑数据成功'
        });

    } catch (error) {
        console.error('获取动态编辑数据失败:', error);
        res.status(500).json({
            success: false,
            message: '服务器错误，请稍后重试'
        });
    }
};



/**
 * 根据动态 ID 查询并返回该动态的详细信息，包括作者信息和评论信息
 */
exports.getPostDetail = async (req, res) => {
    try {
        // 从请求参数中获取动态ID
        const postId = parseInt(req.body.id);

        // 校验动态ID
        if (isNaN(postId)) {
            return res.status(400).json({
                success: false,
                message: '动态ID必须为有效的整数'
            });
        }

        // 查询动态信息
        const post = await dbapiPost.queryPost(postId);
        if (post.length === 0) {
            return res.status(404).json({
                success: false,
                message: '动态未找到'
            });
        }

        // 查询作者信息
        const authorId = post[0].user_id;
        const author = await dbapiUser.queryUser(authorId);
        if (author.length === 0) {
            return res.status(404).json({
                success: false,
                message: '作者未找到'
            });
        }

        // 查询动态的点赞数
        const likesCount = await dbapiLike.queryAllLikes().then(likes => {
            return likes.filter(like => like.post_id === postId).length;  // 统计点赞数量
        });

        // 查询动态的所有评论
        const comments = await dbapiComment.queryAllComments(); // 变更为查询所有评论

        // 过滤出与当前动态ID相关的评论
        const postComments = comments.filter(comment => comment.post_id === postId);

        // 格式化评论数据
        const formattedComments = [];

        for (const comment of postComments) {
            // 查询每个评论者的用户名
            const usernameResults = await queryAll('SELECT username FROM user WHERE user_id = ?', [comment.user_id]);
            const username = usernameResults.length > 0 ? usernameResults[0].username : null;
        
            // 格式化评论数据
            formattedComments.push({
                commentid: comment.comment_id,  // 评论ID
                content: comment.content,      // 评论内容
                timestamp: comment.created_at, // 评论时间
                commenter: {
                    id: comment.user_id,       // 评论者ID
                    avatar: comment.user_avatar, // 评论者头像
                    username: username         // 添加评论者用户名
                }
            });
        }
        

console.log(formattedComments);
        // 返回成功响应
        res.status(200).json({
            success: true,
            message: '获取动态详情成功',
            post: {
                id: post[0].post_id,               // 动态ID
                title: post[0].title,               // 动态标题
                content: post[0].content,           // 动态内容
                timestamp: post[0].created_at,      // 发动态时间
                likes: likesCount,                  // 点赞数
                comments: formattedComments.length    // 评论数
            },
            author: {
                id: author[0].user_id,             // 作者ID
                username: author[0].username,      // 作者用户名
                avatar: author[0].avatar            // 作者头像
            },
            comments: formattedComments             // 评论数组
        });

    } catch (error) {
        console.error('获取动态详情失败:', error);
        res.status(500).json({
            success: false,
            message: '服务器错误，请稍后重试'
        });
    }
};


/**
 * 发表评论的功能
 * @param {Object} req - 请求对象，包含评论信息
 * @param {Object} res - 响应对象，返回结果
 */
exports.postComment = async (req, res) => {
    try {
        const { id, content, postid } = req.body; // 获取请求体中的用户ID、评论内容和帖子ID

        // 校验用户ID、评论内容和帖子ID
        if (!id || !content || !postid) {
            return res.status(400).json({
                success: false,
                message: '用户ID、评论内容和帖子ID不能为空'
            });
        }

        // 校验评论内容是否为空
        if (content.trim() === '') {
            return res.status(400).json({
                success: false,
                message: '评论内容不能为空'
            });
        }

        // 校验帖子是否存在
        const post = await dbapiPost.queryPost(postid); // 根据帖子ID查询帖子
        if (post.length === 0) {
            return res.status(404).json({
                success: false,
                message: '帖子未找到'
            });
        }

        // 构造评论对象
        const newComment = {
            user_id: id, // 评论用户ID
            post_id: postid, // 被评论的帖子ID
            content: content, // 评论内容
            user_avatar: '', // 这里假设没有提供用户头像，可以扩展逻辑获取
            created_at: new Date() // 评论时间
        };

        // 插入新评论
        const commentId = await dbapiComment.insertComment(newComment);

        // 返回成功响应
        res.status(200).json({
            success: true,
            message: '评论成功',
            commentId: commentId // 返回新评论的ID
        });
    } catch (error) {
        console.error('发表评论失败:', error);
        res.status(500).json({
            success: false,
            message: '服务器错误，请稍后重试'
        });
    }
};


/**
 * 点赞功能
 * @param {Object} req - 请求对象，包含用户ID和帖子ID
 * @param {Object} res - 响应对象，返回结果
 */
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

        // 校验帖子是否存在
        const postQuery = 'SELECT * FROM post WHERE post_id = ?'; // 查询帖子是否存在
        const post = await queryAll(postQuery, [postid]); 
        if (post.length === 0) {
            return res.status(404).json({
                success: false,
                message: '帖子未找到'
            });
        }

        // 查询用户是否已经点赞
        const likeCheckQuery = 'SELECT * FROM `like` WHERE user_id = ? AND post_id = ?';
        const likes = await queryAll(likeCheckQuery, [id, postid]); 
        if (likes.length > 0) {
            // 在返回信息中包括当前点赞数
            const likeCountResult = await queryAll('SELECT COUNT(*) AS like_count FROM `like` WHERE post_id = ?', [postid]);
            const likeCount = likeCountResult[0]?.like_count || 0;

            return res.status(400).json({
                success: false,
                message: '您已经点赞过此帖子',
                like_count: likeCount // 返回现有点赞数
            });
        }

        // 记录用户点赞
        const insertLikeQuery = 'INSERT INTO `like` (user_id, post_id, created_at) VALUES (?, ?, NOW())';
        await queryAll(insertLikeQuery, [id, postid]); // 记录用户点赞

        // 查询点赞数
        const likesCountQuery = 'SELECT COUNT(*) AS like_count FROM `like` WHERE post_id = ?';
        const likeCountResult = await queryAll(likesCountQuery, [postid]);
        const likeCount = likeCountResult[0]?.like_count || 0; // 获取点赞数

        // 包含 success 和 like_count 和是否点赞成功的结果
        res.status(200).json({
            success: true,
            message: '点赞成功',
            like_count: likeCount
        });

    } catch (error) {
        console.error('点赞失败:', error);
        // 返回当前帖子的点赞数
        const likeCountResult = await queryAll('SELECT COUNT(*) AS like_count FROM `like` WHERE post_id = ?', [postid]);
        const likeCount = likeCountResult[0]?.like_count || 0;

        res.status(500).json({
            success: false,
            message: '服务器错误，请稍后重试',
            like_count: likeCount // 返回当前帖子的点赞数
        });
    }
};



    