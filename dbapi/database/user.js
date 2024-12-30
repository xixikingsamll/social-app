const db = require('../../backend/db/index'); // 引入数据库连接池模块

/**
 * 用户表数据库操作模块
 *
 * 本模块提供了对用户表的增删查改等基础操作，以及一些特定的查询功能。
 *
 * @module user
 */


/**
 * 向用户表中插入一条新用户记录
 *
 * @param {Object} newUser - 新用户对象，包含用户名、邮箱和密码等属性
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为新插入用户的ID
 */
async function insertUser(newUser) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO user SET ?', newUser, (err, results) => {
            if (err) {
                console.error('插入用户数据失败:', err);
                return reject(err);  // 若插入失败，拒绝Promise
            }
            console.log('用户数据插入成功:', results.insertId);
            resolve(results.insertId);  // 若插入成功，解析Promise为新用户ID
        });
    });
}

/**
 * 根据用户ID删除用户
 *
 * @param {number} userId - 用户ID
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为被删除的行数
 */
async function deleteUser(userId) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM user WHERE user_id = ?', [userId], (err, results) => {
            if (err) {
                console.error('删除用户数据失败:', err);
                return reject(err);  // 若删除失败，拒绝Promise
            }
            console.log('用户数据删除成功:', results.affectedRows);
            resolve(results.affectedRows);  // 若删除成功，解析Promise为被删除的行数
        });
    });
}

/**
 * 根据用户ID查询用户信息
 *
 * @param {number} userId - 用户ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含用户信息的对象数组
 */
async function queryUser(userId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE user_id = ?', [userId], (err, results) => {
            if (err) {
                console.error('查询用户数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为用户信息数组
        });
    });
}

/**
 * 根据用户名查询用户信息
 *
 * @param {string} username - 用户名
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含用户信息的对象数组
 */
async function queryUserByUsername(username) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
            if (err) {
                console.error('根据用户名查询用户数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为用户信息数组
        });
    });
}


/**
 * 根据用户ID查询该用户发出的所有动态信息，并按发布时间降序排序
 *
 * @param {number} userId - 用户ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含该用户发出的所有动态信息的对象数组
 */
async function queryPostsByUserId(userId) {
    return new Promise((resolve, reject) => {
        // 构建查询语句，添加 WHERE 子句筛选用户ID，并按 created_at 降序排序
        const query = 'SELECT * FROM post WHERE user_id = ? ORDER BY created_at DESC';
        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error(`查询用户ID为 ${userId} 的动态数据失败:`, err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            console.log(`查询到用户ID为 ${userId} 的动态数据个数:`, results.length);
            resolve(results);  // 若查询成功，解析Promise为该用户发出的所有动态信息数组
        });
    });
}

/**
 * 查询用户对特定动态的点赞情况
 *
 * @param {number} userId - 用户ID
 * @param {number} postId - 动态ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含点赞信息的对象数组
 */
async function queryUserLike(userId, postId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM like WHERE user_id = ? AND post_id = ?', [userId, postId], (err, results) => {
            if (err) {
                console.error('查询用户点赞数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为点赞信息数组
        });
    });
}



// 模块测试
//---------------------------------------------------------------
/**
 * 查询用户表中所有用户信息（用于调试）
 *
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含所有用户信息的对象数组
 */
async function queryAllUser() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user', (err, results) => {
            if (err) {
                console.error('查询所有用户数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为所有用户信息数组
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
//     const newUser = {username: 'kyo', email: 'kyo@foo.com', password: '12345678'}; // 新用户信息，可根据需要修改
//     console.log("Yippee!");
//     try {
//         // 根据需要取消注释想进行的操作以进行测试
//         // const userId = await insertUser(newUser);  // 插入新用户并获取其ID
//         // const result = await queryUser(userId);  // 根据ID查询新插入的用户信息
//         // console.log('查询结果：', result);
//         // const result = await queryUserByUsername('kyo');  // 根据用户名查询用户信息
//         // console.log('查询结果：', result);
//         // const results = await queryAllUser();  // 查询所有用户信息
//         // console.log('查询结果:', results);
//         // const deleteResult = await deleteUser(11);  // 删除刚刚插入的用户
//         // console.log('删除结果:', deleteResult);
//         // ..在这里自定义想进行的其他测试
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
 * 3. 执行命令 `node user.js` 运行该脚本
 */



module.exports = {
    insertUser,
    deleteUser,
    queryUser,
    queryUserByUsername,
    queryPostsByUserId,
    queryUserLike,
    queryAllUser,
};