const db = require('../db/index');

async function saveMessage(chatId, userId, content, sentAt) {
    const insertMessage = 'INSERT INTO message (chat_id, user_id, content, sent_at) VALUES (?, ?, ?, ?)';
    await queryAll(insertMessage, [chatId, userId, content, sentAt]);
}

async function getChatUsers(chatId, excludeUserId) {
    const sql = 'SELECT user_id FROM chat_user WHERE chat_id = ? AND user_id != ?';
    const results = await queryAll(sql, [chatId, excludeUserId]);
    return results.map(row => row.user_id);
}

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

module.exports = {
    saveMessage,
    getChatUsers,
};
