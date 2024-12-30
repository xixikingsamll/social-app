const db = require('../../backend/db/index'); // 引入数据库连接池模块

/**
 * 聊天室_用户关联表数据库操作模块
 *
 * 本模块提供了对聊天室_用户关联表的增删查改等基础操作，以及一些特定的查询功能。
 *
 * @module chat_user
 */


/**
 * 向聊天_用户关联表中插入一条新记录
 * @param {Object} newChatUser - 新记录对象，包含聊天ID和用户ID等属性
 * @returns {Promise<void>} - 返回一个Promise对象，成功时不解析任何值
 */
async function insertChatUser(newChatUser) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO chat_user SET ?', newChatUser, (err, results) => {
            if (err) {
                console.error('插入聊天_用户关联数据失败:', err);
                return reject(err);  // 若插入失败，拒绝Promise
            }
            console.log('聊天_用户关联数据插入成功');
            resolve();  // 若插入成功，解析Promise
        });
    });
}

/**
 * 根据聊天ID和用户ID删除聊天_用户关联记录
 * @param {number} chatId - 聊天ID
 * @param {number} userId - 用户ID
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为被删除的行数
 */
async function deleteChatUser(chatId, userId) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM chat_user WHERE chat_id = ? AND user_id = ?', [chatId, userId], (err, results) => {
            if (err) {
                console.error('删除聊天_用户关联数据失败:', err);
                return reject(err);  // 若删除失败，拒绝Promise
            }
            console.log('聊天_用户关联数据删除成功:', results.affectedRows);
            resolve(results.affectedRows);  // 若删除成功，解析Promise为被删除的行数
        });
    });
}

/**
 * 根据聊天ID和用户ID查询聊天_用户关联信息
 * @param {number} chatId - 聊天ID
 * @param {number} userId - 用户ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含关联信息的对象数组
 */
async function queryChatUser(chatId, userId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM chat_user WHERE chat_id = ? AND user_id = ?', [chatId, userId], (err, results) => {
            if (err) {
                console.error('查询聊天_用户关联数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为关联信息数组
        });
    });
}


/**
 * 根据聊天ID，查询所有加入该聊天的用户
 * @param {number} chatId - 聊天ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含所有用户信息的对象数组
 */
async function queryUsersInChat(chatId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT user.* FROM user JOIN chat_user ON user.user_id = chat_user.user_id WHERE chat_user.chat_id = ?', [chatId], (err, results) => {
            if (err) {
                console.error('查询聊天室用户数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            console.log('查询到聊天室用户数据:', results.length);
            resolve(results);  // 若查询成功，解析Promise为所有用户信息数组
        });
    });
}

/**
 * 根据用户ID，查询该用户加入的所有聊天，并按照每个聊天的最后一条消息时间降序排序，如果聊天室没有人发过消息，则按照聊天室的创建时间来参与排序，
 * @param {number} userId - 用户ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含用户加入的聊天信息的对象数组
 */
async function queryUserChats(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT c.chat_id,
                   c.title,
                   COALESCE(MAX(m.sent_at), c.created_at) AS last_active_time
            FROM chat_user cu
                     JOIN chat c ON cu.chat_id = c.chat_id
                     LEFT JOIN message m ON c.chat_id = m.chat_id
            WHERE cu.user_id = ?
            GROUP BY c.chat_id, c.title
            ORDER BY last_active_time DESC
        `;
        db.query(sql, [userId], (err, results) => {
            if (err) {
                console.error('查询用户加入的聊天数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            console.log('查询到用户加入的聊天数据:', results.length);
            resolve(results);  // 若查询成功，解析Promise为聊天信息数组
        });
    });
}




// 模块测试
//---------------------------------------------------------------

/**
 * 查询聊天_用户关联表中所有的聊天+用户对（用于调试）
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含所有聊天_用户关联信息的对象数组
 */
async function queryAllChatUsers() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM chat_user', (err, results) => {
            if (err) {
                console.error('查询聊天_用户关联数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为所有聊天_用户关联信息数组
        });
    });
}

/**
 * 测试本模块功能（用于调试）
 *
 * 该函数用于验证本模块中定义的数据库操作函数是否正常工作。
 * 它通过执行一系列操作（如插入、查询、更新和删除）来测试这些函数的功能，
 * 并输出相应的结果，以便于开发者检查和调试代码。
 *
 * @returns {Promise<void>} - 该函数不返回任何值，仅用于测试和调试目的
 */
// async function test() {
//     const newChatUser = {
//         chat_id: 11, // 假设聊天ID为11
//         user_id: 1  // 假设用户ID为1
//     }; // 新聊天_用户关联信息
//     console.log("Yippee!");
//     try {
//         // 根据需要取消注释想进行的操作以进行测试
//         // await insertChatUser(newChatUser);  // 插入新聊天_用户关联记录
//         // const result = await queryChatUser(11, 1);  // 根据聊天ID和用户ID查询关联信息
//         // console.log('查询结果：', result);
//         // const deleteResult = await deleteChatUser(1, 1);  // 删除刚刚插入的关联记录
//         // console.log('删除结果:', deleteResult);
//         // // 查询某个聊天室的所有用户
//         // const usersInChat = await queryUsersInChat(1);
//         // console.log('聊天室用户信息:', usersInChat);
//         // // 查询某个用户加入的所有聊天，并按照每个聊天的最后一条消息时间降序排序
//         // // 如果聊天室没有人发过消息，则按照聊天室的创建时间来参与排序
//         // const userChats = await queryUserChats(1);
//         // console.log('聊天室用户信息:', userChats);
//         // ..自定义想进行的其他测试
//     } catch (err) {
//         console.error('操作失败:', err);
//     }
//     process.exit();
// }
//
// test();
/**
 * 测试方法：
 *
 * 1. 确保电脑已安装Node.js
 * 2. 打开控制台，切换到脚本所在的database目录
 * 3. 执行命令 `node chat_user.js` 运行该脚本
 */




module.exports = {
    insertChatUser,
    deleteChatUser,
    queryChatUser,
    queryUsersInChat,
    queryUserChats,
    queryAllChatUsers,
};