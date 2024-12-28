const db = require('../../backend/db/index');  // 引入数据库连接池模块

/**
 * 消息表数据库操作模块
 *
 * 本模块提供了对消息表的增删查改等基础操作，以及一些特定的查询功能。
 *
 * @module message
 */


/**
 * 向消息表中插入一条新消息记录
 *
 * @param {Object} newMessage - 新消息对象，包含聊天ID、用户ID和消息内容等属性
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为新插入消息的ID
 */
async function insertMessage(newMessage) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO message SET ?', newMessage, (err, results) => {
            if (err) {
                console.error('插入消息数据失败:', err);
                return reject(err);  // 若插入失败，拒绝Promise
            }
            console.log('消息数据插入成功:', results.insertId);
            resolve(results.insertId);  // 若插入成功，解析Promise为新消息ID
        });
    });
}

/**
 * 根据消息ID删除消息
 *
 * @param {number} messageId - 消息ID
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为被删除的行数
 */
async function deleteMessage(messageId) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM message WHERE message_id = ?', [messageId], (err, results) => {
            if (err) {
                console.error('删除消息数据失败:', err);
                return reject(err);  // 若删除失败，拒绝Promise
            }
            console.log('消息数据删除成功:', results.affectedRows);
            resolve(results.affectedRows);  // 若删除成功，解析Promise为被删除的行数
        });
    });
}

/**
 * 根据消息ID查询消息信息
 *
 * @param {number} messageId - 消息ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含消息信息的对象数组
 */
async function queryMessage(messageId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM message WHERE message_id = ?', [messageId], (err, results) => {
            if (err) {
                console.error('查询消息数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为消息信息数组
        });
    });
}



// 三、模块测试
//---------------------------------------------------------------
/**
 * 查询消息表中所有消息信息（用于调试）
 *
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含所有消息信息的对象数组
 */
async function queryAllMessages() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM message', (err, results) => {
            if (err) {
                console.error('查询所有消息数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            console.log('查询到所有消息数据:', results.length);
            resolve(results);  // 若查询成功，解析Promise为所有消息信息数组
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
//     const newMessage = {
//         chat_id: 2, // 假设聊天ID为2
//         user_id: 1, // 假设用户ID为1
//         content: '大家好，这是我的第一条消息！'
//     }; // 新消息信息
//     console.log("Yippee!");
//     try {
//         // 根据需要取消注释想进行的操作以进行测试
//         // const messageId = await insertMessage(newMessage);  // 插入新消息并获取其ID
//         // const result = await queryMessage(messageId);  // 根据ID查询新插入的消息信息
//         // console.log('查询结果：', result);
//         // const deleteResult = await deleteMessage(messageId);  // 删除刚刚插入的消息
//         // console.log('删除结果:', deleteResult);
//         // // 查询所有消息信息
//         // const allMessages = await queryAllMessages();
//         // console.log('所有消息信息:', allMessages);
//         // // 查询特定聊天室的所有消息
//         // const chatMessages = await queryMessagesByChatId(2);
//         // console.log('特定聊天室的所有消息:', chatMessages);
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
 * 3. 执行命令 `node message.js` 运行该脚本
 */


module.exports = {
    insertMessage,
    queryMessage,
    deleteMessage,
    queryAllMessages,
};