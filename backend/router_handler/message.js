const db = require('../db/index')
const dbapi=require('../../dbapi/database/user')

exports.getMessage = async (req, res) => {
    try {
        const userId = req.body.id;

        if (!userId) {
            return res.status(400).json({
                success: 'false',
                message: '缺少用户id参数'
            });
        }

        // 查询用户信息
        const userResults = await dbapi.queryUser(userId);

        if (userResults.length === 0) {
            return res.status(400).json({
                success: 'false',
                message: '用户信息未找到'
            });
        }

        const userInfo = userResults[0];

        // 查找当前登录用户所属的聊天室
        const sqlGetChatIdbyUserId = 'SELECT chat_id FROM chat_user WHERE user_id=?';
        const chatIdResults=await queryAll(sqlGetChatIdbyUserId,userId);

        // 提取聊天室ID
        const chatIds = chatIdResults.map(row => row.chat_id);
        const chats = [];

        for (let chatId of chatIds) {
            // 查找当前聊天室的其他用户id
            const sqlOtherUsersInChatId = 'SELECT user_id FROM chat_user WHERE chat_id=? AND user_id!=?';
            const otherUserIdResults=await queryAll(sqlOtherUsersInChatId,[chatId,userId]);

            const otherUserId = otherUserIdResults[0].user_id;

            // 查找聊天对象的信息
            const otherUserResults = await dbapi.queryUser(otherUserId);
            const otherUserInfo = otherUserResults[0];

            // 查找最近一条聊天记录
            const sqlGetLastMessage = 'SELECT content, send_at FROM message WHERE chat_id = ? ORDER BY send_at DESC LIMIT 1';
            const lastMessageResult=await queryAll(sqlGetLastMessage,chatId)

            const lastMessage = lastMessageResult.length > 0 ? lastMessageResult[0] : null;

            // 构建chat对象
            chats.push({
                chat_id: chatId,
                user: {
                    id: otherUserId,
                    username: otherUserInfo.username,
                    avatar: otherUserInfo.avatar
                },
                last_message: lastMessage ? {
                    content: lastMessage.content,
                    send_at: lastMessage.send_at
                } : null
            });
        }

        return res.status(200).json({
            success: "true",
            data: {
                user: { // 个人信息
                    id: userInfo.user_id,
                    username: userInfo.username,
                    avatar: userInfo.avatar
                },
                chats
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: "服务器出错",
            error: error.message
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
