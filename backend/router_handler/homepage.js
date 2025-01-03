const db = require('../db/index')
const dbapi=require('../../dbapi/database/user')
exports.homepage=async(req,res)=>{
    try{
        const userId=req.body.id;

        if(!userId){
            return res.status(400)({
                success:'false',
                message:'缺少用户id参数'
            })
        }
        
        const userResults=await dbapi.queryUser(userId);

        if(userResults.length===0){
            return res.status(400).json({
                success:'false',
                message:'用户信息未找到'
            })
        }

        const userInfo=userResults[0];
        db.query('SELECT post_id, title, created_at FROM post where user_id=?',[userId], (err, postResults) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: '加载动态信息时出错',
                error: err.message,
              });
            }
            res.status(200).json({
              success: true,
              data: {
                user: {
                  id: userInfo.user_id,
                  username: userInfo.username,
                  avatar: userInfo.avatar,
                },
                posts:postResults,
              },
            });
          });
    }catch{
        console.error('Error fetching community posts:', error);
        res.status(500).json({
            success: false,
            message: '服务器错误' });
    }
}


exports.createChat = async (req, res) => {
  try {
      const { userIds, title } = req.body;  

      // 检查 userIds 是否为两个有效的用户ID数组
      if (!userIds || !Array.isArray(userIds) || userIds.length !== 2) {
          return res.status(400).json({
              success: false,
              message: '需要提供两个用户的ID数组',
          });
      }

      const [userId1, userId2] = userIds;

      // 检查两个用户是否存在
      const userResults = await queryAll('SELECT user_id, username FROM user WHERE user_id IN (?, ?)', [userId1, userId2]);
      if (userResults.length !== 2) {
          return res.status(400).json({
              success: false,
              message: '一个或多个用户信息未找到',
          });
      }
      const chatIdResults=await queryAll('SELECT chat_id FROM chat_user WHERE user_id IN (?, ?) GROUP BY chat_id HAVING COUNT(DISTINCT user_id) = 2;',[userId1, userId2]);
      console.log(chatIdResults);
      if(chatIdResults.length){
        return res.status(400).json({
            success: false,
            message: '已经有了',
        });
      }
      // 如果没有传入title，自动设置为对方的用户名
      const titleAuto = title || userResults.find(user => user.user_id !== userId1).username;

      // 创建聊天室
      const chatInsertQuery = 'INSERT INTO chat (title, created_at) VALUES (?, NOW())';
      const chatResult = await queryAll(chatInsertQuery, [titleAuto]);
      const chatId = chatResult.insertId; // 获取新创建聊天室的ID

      // 将两个用户加入聊天室
      const chatUserInsertQuery = 'INSERT INTO chat_user (chat_id, user_id) VALUES (?, ?), (?, ?)';
      await queryAll(chatUserInsertQuery, [chatId, userId1, chatId, userId2]);

      res.status(201).json({
          success: true,
          message: '聊天室创建成功',
          data: {
              chatId,
          },
      });
  } catch (error) {
      console.error('Error creating chat:', error);
      res.status(500).json({
          success: false,
          message: '服务器错误',
          error: error.message,
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



exports.getChatIdByUserIds = async (req, res) => {
    try {
        const { userIds } = req.body;
        
        // 检查 userIds 是否为两个有效的用户ID数组
        if (!userIds ||!Array.isArray(userIds) || userIds.length!== 2) {
            return res.status(400).json({
                success: false,
                message: '需要提供两个用户的ID数组',
            });
        }

        const [userId1, userId2] = userIds;

        // 查询是否存在这两个用户共同所在的聊天室的chat_id
        const chatIdResults = await queryAll('SELECT chat_id FROM chat_user WHERE user_id IN (?,?) GROUP BY chat_id HAVING COUNT(DISTINCT user_id) = 2;', [userId1, userId2]);
        if (chatIdResults.length === 0) {
            return res.status(404).json({
                success: false,
                message: '未找到这两个用户对应的聊天室',
            });
        }

        const chatId = chatIdResults[0].chat_id;

        res.status(200).json({
            success: true,
            data: {
                chatId,
            },
        });
    } catch (error) {
        console.error('Error getting chatId by userIds:', error);
        res.status(500).json({
            success: false,
            message: '服务器错误',
            error: error.message,
        });
    }
};
