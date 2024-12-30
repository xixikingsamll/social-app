const db = require('../db/index')

exports.getCommunity = async (req, res) => {
  try {
    const limit = 5; // 固定每次返回 5 个帖子
    const userId = req.body.id;

    if (!userId) {
      return res.status(400).json({ success: false, message: '缺少用户 ID 参数' });
    }

    const sqlGetPosts = 'SELECT post_id, user_id, user_avatar, title, created_at FROM post ORDER BY post_id DESC LIMIT ?';
    const sqlGetUser='select user_id,username,avatar from user where user_id=?';
    const userResults = await queryAll(sqlGetUser,[userId]);
    if (userResults.length === 0) {
      return res.status(404).json({ success: false, message: '用户信息未找到' });
    }

    const userInfo = userResults[0];
console.log(userInfo);
    // 查询帖子信息
    const postResults = await queryAll(sqlGetPosts, [limit]);

    if (postResults.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          user: userInfo,
          posts: [],
        },
      });
    }

    for (const post of postResults) {
      const usernameResults = await queryAll('SELECT username FROM user WHERE user_id = ?', [post.user_id]);
      if (usernameResults.length > 0) {
        post.username = usernameResults[0].username; // 添加 username 属性
      } else {
        post.username = null; // 如果用户未找到，设置为 null
      }
    }

    res.status(200).json({
      success: true,
      data: {
        user:userInfo,
        posts: postResults,
      },
    });
  } catch (error) {
    console.error('Error fetching community posts:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误',
    });
  }
};

async function queryAll(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        console.error('SQL 查询出错:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
}
