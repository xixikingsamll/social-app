const db = require('../../backend/db/index');  // 引入数据库连接池模块

/**
 * 点赞表数据库操作模块
 *
 * 本模块提供了对点赞表的增删查改等基础操作，以及一些特定的查询功能。
 *
 * @module like
 */



/**
 * 向点赞表中插入一条新点赞记录
 * @param {Object} newLike - 新点赞对象，包含动态ID和用户ID等属性
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为新插入点赞的ID
 */
async function insertLike(newLike) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO `like` SET ?', newLike, (err, results) => {
            if (err) {
                console.error('插入点赞数据失败:', err);
                return reject(err);  // 若插入失败，拒绝Promise
            }
            console.log('点赞数据插入成功:', results.insertId);
            resolve(results.insertId);  // 若插入成功，解析Promise为新点赞ID
        });
    });
}

/**
 * 根据点赞ID删除点赞
 * @param {number} likeId - 点赞ID
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为被删除的行数
 */
async function deleteLike(likeId) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM `like` WHERE like_id = ?', [likeId], (err, results) => {
            if (err) {
                console.error('删除点赞数据失败:', err);
                return reject(err);  // 若删除失败，拒绝Promise
            }
            console.log('点赞数据删除成功:', results.affectedRows);
            resolve(results.affectedRows);  // 若删除成功，解析Promise为被删除的行数
        });
    });
}

/**
 * 根据点赞ID查询点赞信息
 * @param {number} likeId - 点赞ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含点赞信息的对象数组
 */
async function queryLike(likeId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM `like` WHERE like_id = ?', [likeId], (err, results) => {
            if (err) {
                console.error('查询点赞数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为点赞信息数组
        });
    });
}



// 三、模块测试
//---------------------------------------------------------------
/** DEBUG用
 * 查询点赞表中所有点赞记录（用于调试）
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含所有点赞信息的对象数组
 */
async function queryAllLikes() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM `like`', (err, results) => {
            if (err) {
                console.error('查询所有点赞数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为所有点赞信息数组
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
//     const newLike = {
//         post_id: 1, // 假设动态ID为1
//         user_id: 1  // 假设用户ID为1
//     }; // 新点赞信息
//     console.log("Yippee!");
//     try {
//         // 根据需要取消注释想进行的操作以进行测试
//         // const likeId = await insertLike(newLike);  // 插入新点赞并获取其ID
//         // const result = await queryLike(likeId);  // 根据ID查询新插入的点赞信息
//         // console.log('查询结果：', result);
//         // const deleteResult = await deleteLike(likeId);  // 删除刚刚插入的点赞
//         // console.log('删除结果:', deleteResult);
//         // // 查询用户对特定动态的点赞情况
//         // const userLikeResult = await queryUserLike(1, 1);
//         // console.log('用户点赞情况:', userLikeResult);
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
 * 3. 执行命令 `node like.js` 运行该脚本
 */

module.exports = {
    insertLike,
    queryLike,
    deleteLike,
    queryAllLikes,
};