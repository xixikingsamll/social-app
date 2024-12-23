const db = require('./db'); // 引入数据库连接池模块

/**
 * 聊天室表数据库操作模块
 *
 * 本模块提供了对聊天室表的增删查改等基础操作，以及一些特定的查询功能。
 *
 * @module chat
 */


/**
 * 向聊天表中插入一条新聊天室记录
 * @param {Object} newChat - 新聊天室对象，包含聊天标题等属性
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为新插入聊天室的ID
 */
async function insertChat(newChat) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO chat SET ?', newChat, (err, results) => {
            if (err) {
                console.error('插入聊天室数据失败:', err);
                return reject(err);  // 若插入失败，拒绝Promise
            }
            console.log('聊天室数据插入成功:', results.insertId);
            resolve(results.insertId);  // 若插入成功，解析Promise为新聊天室ID
        });
    });
}

/**
 * 根据聊天室ID删除聊天室
 * @param {number} chatId - 聊天室ID
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为被删除的行数
 */
async function deleteChat(chatId) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM chat WHERE chat_id = ?', [chatId], (err, results) => {
            if (err) {
                console.error('删除聊天室数据失败:', err);
                return reject(err);  // 若删除失败，拒绝Promise
            }
            console.log('聊天室数据删除成功:', results.affectedRows);
            resolve(results.affectedRows);  // 若删除成功，解析Promise为被删除的行数
        });
    });
}

/**
 * 根据聊天室ID查询聊天室信息
 * @param {number} chatId - 聊天室ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含聊天室信息的对象数组
 */
async function queryChat(chatId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM chat WHERE chat_id = ?', [chatId], (err, results) => {
            if (err) {
                console.error('查询聊天室数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为聊天室信息数组
        });
    });
}



/**
 * 根据聊天ID查询属于该聊天的所有消息信息，查询成功将消息发送时间升序排序
 * @param {number} chatId - 聊天ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含属于该聊天的所有消息信息的对象数组
 */
async function queryMessagesByChatId(chatId) {
    return new Promise((resolve, reject) => {
        // 构建查询语句，添加 WHERE 子句筛选聊天ID，并按 created_at 升序排序
        const query = 'SELECT * FROM message WHERE chat_id = ? ORDER BY created_at ASC';
        db.query(query, [chatId], (err, results) => {
            if (err) {
                console.error(`查询聊天ID为 ${chatId} 的消息数据失败:`, err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            console.log(`查询到聊天ID为 ${chatId} 的消息数据个数:`, results.length);
            resolve(results);  // 若查询成功，解析Promise为属于该聊天的所有消息信息数组
        });
    });
}



// 模块测试
//---------------------------------------------------------------

/**
 * 查询聊天表所有聊天室信息（用于调试）
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含所有聊天室信息的对象数组
 */
async function queryAllChats() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM chat', (err, results) => {
            if (err) {
                console.error('查询所有聊天室数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为所有聊天室信息数组
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
//     const newChat = {title: 'TG 结点分享群'}; // 新聊天室信息
//     console.log("Yippee!");
//     try {
//         // 根据需要取消注释想进行的操作以进行测试
//         const chatId = await insertChat(newChat);  // 插入新聊天室并获取其ID
//         // const result = await queryChat(chatId);  // 根据ID查询新插入的聊天室信息
//         // console.log('查询结果：', result);
//         // const results = await queryAllChats();  // 查询所有聊天室信息
//         // console.log('查询结果:', results);
//         // const deleteResult = await deleteChat(chatId);  // 删除刚刚插入的聊天室
//         // console.log('删除结果:', deleteResult);
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
 * 3. 执行命令 `node chat.js` 运行该脚本
 */

module.exports = {
    insertChat,
    deleteChat,
    queryChat,
    queryMessagesByChatId,
    queryAllChats,
};