const db = require('../db/index')
const dbapi=require('../../dbapi/database/user')

// 获取社区广场的帖子列表
exports.getCommunity = async (req, res) => {
    try {
      const limit = 5; // 固定每次返回 5 个帖子
      console.log('JWT Payload:', req.user); 
      const userId=req.body.id;
  
      if (!userId) {
        return res.status(400).json({ success: false, message: '缺少用户 ID 参数' });
      }
  
      // 查询用户信息的 SQL
      const sqlGetUserInfo = 'SELECT user_id, username, avatar FROM user WHERE user_id = ?';
      
      // 查询帖子信息的 SQL
      const sqlGetPosts = 'SELECT post_id, user_id, user_avatar, title, created_at FROM post ORDER BY post_id desc LIMIT ?';
  
      const userResults=await dbapi.queryUser(userId);//这个是调用数据库设计的接口，如果不调用，可以参考下面的注释
      // 查询用户信息
      /*db.query(sqlGetUserInfo, [userId], (err, userResults) => {//[]里面是sql语句里面的 ？ ，这样是避免了明文传递，多个问号，[]里面的参数也就多个
        if (err) {
          return res.status(500).json({ success: false, message: '加载用户信息时出错', error: err.message });
        }*/
  
        if (userResults.length === 0) {//这个是查询结果，是数组
          return res.status(404).json({ 
            success: false,
            message: '用户信息未找到' });
        }
  
        const userInfo = userResults[0]; // 获取用户信息
        console.log("userInfo:"+userInfo);
        console.log("userResults:"+userResults);
        console.log("userInfo.user_id:"+userInfo.user_id);
  
        // 查询帖子信息
        db.query(sqlGetPosts, [limit], (err, postResults) => {
          if (err) {
            return res.status(500).json({ 
              success: false, 
              message: '加载动态信息时出错', 
              error: err.message });
          }
  
          res.status(200).json({
            success: true,
            data: {
              user: {
                id: userInfo.user_id,
                username: userInfo.username,
                avatar: userInfo.user_avatar,
              },
              posts: postResults,
            },
          });
        });
      }catch (error) {
      console.error('Error fetching community posts:', error);
      res.status(500).json({
        success: false,
        message: '服务器错误' });
      }}