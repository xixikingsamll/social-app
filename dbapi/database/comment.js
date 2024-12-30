const db = require('../../backend/db/index'); // 引入数据库连接池模块

/**
 * 评论表数据库操作模块
 *
 * 本模块提供了对评论表的增删查改等基础操作，以及一些特定的查询功能。
 *
 * @module comment
 */


/**
 * 向评论表中插入一条新评论记录
 * @param {Object} newComment - 新评论对象，包含动态ID、用户ID、用户头像URL和评论内容等属性
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为新插入评论的ID
 */
async function insertComment(newComment) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO comment SET ?', newComment, (err, results) => {
            if (err) {
                console.error('插入评论数据失败:', err);
                return reject(err);  // 若插入失败，拒绝Promise
            }
            console.log('评论数据插入成功:', results.insertId);
            resolve(results.insertId);  // 若插入成功，解析Promise为新评论ID
        });
    });
}

/**
 * 根据评论ID删除评论
 * @param {number} commentId - 评论ID
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为被删除的行数
 */
async function deleteComment(commentId) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM comment WHERE comment_id = ?', [commentId], (err, results) => {
            if (err) {
                console.error('删除评论数据失败:', err);
                return reject(err);  // 若删除失败，拒绝Promise
            }
            console.log('评论数据删除成功:', results.affectedRows);
            resolve(results.affectedRows);  // 若删除成功，解析Promise为被删除的行数
        });
    });
}

/**
 * 根据评论ID查询评论信息
 * @param {number} commentId - 评论ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含评论信息的对象数组
 */
async function queryComment(commentId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM comment WHERE comment_id = ?', [commentId], (err, results) => {
            if (err) {
                console.error('查询评论数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为评论信息数组
        });
    });
}

/**
 * 根据评论ID更新评论信息
 * @param {number} commentId - 评论ID
 * @param {Object} updateData - 需要更新的评论信息对象
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为被更新的行数
 */
async function updateComment(commentId, updateData) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE comment SET ? WHERE comment_id = ?', [updateData, commentId], (err, results) => {
            if (err) {
                console.error('更新评论数据失败:', err);
                return reject(err);  // 若更新失败，拒绝Promise
            }
            console.log('评论数据更新成功:', results.changedRows);
            resolve(results.changedRows);  // 若更新成功，解析Promise为被更新的行数
        });
    });
}




// 模块测试
//---------------------------------------------------------------
/** DEBUG用
 * 查询评论表中所有评论信息（用于调试）
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含所有评论信息的对象数组
 */
async function queryAllComments() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM comment', (err, results) => {
            if (err) {
                console.error('查询所有评论数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            console.log('查询到所有评论数据:', results.length);
            resolve(results);  // 若查询成功，解析Promise为所有评论信息数组
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
//     const newComment = {
//         post_id: 3, // 假设动态ID为2
//         user_id: 10, // 假设用户ID为10
//         user_avatar: 'https://example.com/avatar.jpg',
//         content: '沙发！'
//     }; // 新评论信息
//     console.log("Yippee!");
//     try {
//         // 根据需要取消注释想进行的操作以进行测试
//         // const commentId = await insertComment(newComment);  // 插入新评论并获取其ID
//         // const result = await queryComment(commentId);  // 根据ID查询新插入的评论信息
//         // console.log('查询结果：', result);
//         // const updateData = { content: '板凳——' }; // 更新评论内容
//         // const updateResult = await updateComment(commentId, updateData); // 更新评论信息
//         // console.log('更新结果:', updateResult);
//         // const deleteResult = await deleteComment(commentId);  // 删除刚刚插入的评论
//         // console.log('删除结果:', deleteResult);
//         // // 查询所有评论信息
//         // const allComments = await queryAllComments();
//         // console.log('所有评论信息:', allComments);
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
 * 3. 执行命令 `node comment.js` 运行该脚本
 */

module.exports = {
    insertComment,
    deleteComment,
    queryComment,
    updateComment,
    queryAllComments,
};