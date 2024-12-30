const db = require('../db/index');

exports.saveMessage=async(chatId, userId, content, sentAt)=> {
    const insertMessage = 'INSERT INTO message (chat_id, user_id, content, sent_at) VALUES (?, ?, ?, ?)';
    await queryAll(insertMessage, [chatId, userId, content, sentAt]);//将发送的信息保存到数据库
}

exports.getChatUsers=async(chatId, excludeUserId)=> {
    const getUserId = 'SELECT user_id FROM chat_user WHERE chat_id = ? AND user_id != ?';
    const results = await queryAll(getUserId, [chatId, excludeUserId]);
    return results.map(row => row.user_id);//查找聊天对象的id
}


exports.getChatDetail = async (req, res) => {
    try {
        const { chatid } = req.body;

        // 校验聊天室ID
        if (isNaN(chatid)) {
            return res.status(400).json({
                success: false,
                message: '聊天室ID必须为有效的整数'
            });
        }

        // 查询聊天信息
        const chatSql = 'SELECT * FROM chat WHERE chat_id = ?'; 
        const chat = await queryAll(chatSql, [chatid]);
        if (chat.length === 0) {
            return res.status(404).json({
                success: false,
                message: '聊天室未找到'
            });
        }

        // 查询用户信息
        const chatUserSql = 'SELECT user_id FROM chat_user WHERE chat_id = ?'; 
        const chatUserIds = await queryAll(chatUserSql, [chatid]);

        // 获取所有用户的详细信息
        const usersPromise = chatUserIds.map(async (user) => {
            const userSql = 'SELECT user_id, username, avatar FROM user WHERE user_id = ?'; 
            return await queryAll(userSql, [user.user_id]);
        });
        const userDetails = await Promise.all(usersPromise);
        const users = userDetails.flat();

        // 查询消息信息
        const messagesSql = 'SELECT * FROM message WHERE chat_id = ?'; 
        const messages = await queryAll(messagesSql, [chatid]); 

        // 格式化消息数据
        const formattedMessages = messages.map(msg => ({
            messageId: msg.message_id,
            content: msg.content,
            timestamp: msg.sent_at,
            senderId: msg.user_id // 只保留sender的id
        }));

        // 返回成功响应
        res.status(200).json({
            success: true,
            message: '获取聊天室详情成功',
            chat: {
                id: chat[0].chat_id,
                title: chat[0].title,

                users: users.map(user => ({
                    id: user.user_id,
                    avatar: user.avatar,
                    username: user.username
                })) // 将用户信息放在这里
            },
            messages: formattedMessages // 消息数组
        });

    } catch (error) {
        console.error('获取聊天室详情失败:', error);
        res.status(500).json({
            success: false,
            message: '服务器错误，请稍后重试'
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

