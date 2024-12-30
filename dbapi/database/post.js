const db = require('../../backend/db/index'); // 引入数据库连接池模块

/**
 * 动态表数据库操作模块
 *
 * 本模块提供了对动态表的增删查改等基础操作，以及一些特定的查询功能。
 *
 * @module post
 */


/**
 * 向动态表中插入一条新动态记录
 *
 * @param {Object} newPost - 新动态对象，包含用户ID、用户头像URL、动态标题和内容等属性
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为新插入动态的ID
 */
async function insertPost(newPost) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO post SET ?', newPost, (err, results) => {
            if (err) {
                console.error('插入动态数据失败:', err);
                return reject(err);  // 若插入失败，拒绝Promise
            }
            console.log('动态数据插入成功:', results.insertId);
            resolve(results.insertId);  // 若插入成功，解析Promise为新动态ID
        });
    });
}

/**
 * 根据动态ID删除动态
 *
 * @param {number} postId - 动态ID
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为被删除的行数
 */
async function deletePost(postId) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM post WHERE post_id = ?', [postId], (err, results) => {
            if (err) {
                console.error('删除动态数据失败:', err);
                return reject(err);  // 若删除失败，拒绝Promise
            }
            console.log('动态数据删除成功:', results.affectedRows);
            resolve(results.affectedRows);  // 若删除成功，解析Promise为被删除的行数
        });
    });
}

/**
 * 根据动态ID查询动态信息
 *
 * @param {number} postId - 动态ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含动态信息的对象数组
 */
async function queryPost(postId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM post WHERE post_id = ?', [postId], (err, results) => {
            if (err) {
                console.error('查询动态数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为动态信息数组
        });
    });
}

/**
 * 根据动态ID更新动态信息
 *
 * @param {number} postId - 动态ID
 * @param {Object} updateData - 需要更新的动态信息对象
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为被更新的行数
 */
async function updatePost(postId, updateData) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE post SET ? WHERE post_id = ?', [updateData, postId], (err, results) => {
            if (err) {
                console.error('更新动态数据失败:', err);
                return reject(err);  // 若更新失败，拒绝Promise
            }
            console.log('动态数据更新成功:', results.changedRows);
            resolve(results.changedRows);  // 若更新成功，解析Promise为被更新的行数
        });
    });
}

/**
 * 根据动态ID查询评论信息，并按评论发布时间降序排序
 *
 * @param {number} postId - 动态ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含与该动态ID相关的评论信息的对象数组
 */
async function queryCommentsByPostId(postId) {
    return new Promise((resolve, reject) => {
        // 构建查询语句，添加 WHERE 子句筛选动态ID，并按 created_at 降序排序
        const query = 'SELECT * FROM comment WHERE post_id = ? ORDER BY created_at DESC';
        db.query(query, [postId], (err, results) => {
            if (err) {
                console.error(`查询动态ID为 ${postId} 的评论数据失败:`, err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            console.log(`查询到动态ID为 ${postId} 的评论数据:`, results.length);
            resolve(results);  // 若查询成功，解析Promise为与该动态ID相关的评论信息数组
        });
    });
}

/**
 * 根据动态ID查询点赞信息，并拼接用户名（可选，用户名可供展示）
 *
 * @param {number} postId - 动态ID
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含点赞信息及用户名的对象数组
 */
async function queryLikesByPostIdWithUsername(postId) {
    return new Promise((resolve, reject) => {
        // 使用 JOIN 操作联合查询 like 表和 user 表，以获取点赞用户的用户名
        const query = `
            SELECT l.like_id, l.post_id, l.user_id, l.created_at, u.username
            FROM like l
            JOIN user u ON l.user_id = u.user_id
            WHERE l.post_id = ?
        `;
        db.query(query, [postId], (err, results) => {
            if (err) {
                console.error(`查询动态ID为 ${postId} 的点赞数据失败:`, err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            resolve(results);  // 若查询成功，解析Promise为包含用户名的点赞信息数组
        });
    });
}

/**
 * 统计一则动态的点赞数量
 *
 * @param {number} postId - 动态ID
 * @returns {Promise<number>} - 返回一个Promise对象，成功时解析为点赞数量
 */
async function countLikesByPostId(postId) {
    try {
        const likes = await queryLikesByPostId(postId);  // 调用第一个函数获取点赞信息
        return likes.length;  // 返回点赞信息数组的长度，即点赞数量
    } catch (error) {
        console.error(`统计动态ID为 ${postId} 的点赞数量失败:`, error);
        throw error;  // 抛出错误，由调用者处理
    }
}




// 三、模块测试
//---------------------------------------------------------------

/**
 * 查询动态表中所有动态信息（用于调试）
 *
 * @returns {Promise<Object[]>} - 返回一个Promise对象，成功时解析为包含所有动态信息的对象数组
 */
async function queryAllPosts() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM post', (err, results) => {
            if (err) {
                console.error('查询所有动态数据失败:', err);
                return reject(err);  // 若查询失败，拒绝Promise
            }
            console.log('查询到所有动态数据个数:', results.length);
            resolve(results);  // 若查询成功，解析Promise为所有动态信息数组
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
//     const newPost = {
//         user_id: 1, // 假设用户ID为1
//         user_avatar: 'https://example.com/avatar1.jpg',
//         title: '分享丨解决c++类内初始化vector报错：expected parameter declarator',
//         content: '待解决问题\n' +
//             '在c++中，如果我们在类里初始化vector会报expected parameter declarator的错误。\n' +
//             '\n' +
//             '本讨论涉及面向对象的一些知识, 但是涉及不深，请谨慎观看😀\n' +
//             '\n' +
//             '原因是编译器区分不了它是成员变量还是成员方法\n' +
//             '\n' +
//             '如下的定义\n' +
//             '\n' +
//             '...\n' +
//             '作者：leelee701\n' +
//             '链接：https://leetcode.cn/circle/discuss/N5OBJU/'
//     }; // 新动态信息
//     console.log("Yippee!");
//     try {
//         // 根据需要取消注释想进行的操作以进行测试
//         const postId = await insertPost(newPost);  // 插入新动态并获取其ID
//         const result = await queryPost(postId);  // 根据ID查询新插入的动态信息
//         console.log('查询结果：', result);
//         // const results = await queryAllPosts(); // 查询所有动态信息
//         // console.log('查询结果', results);
//         // const updateData = { title: 'C++ 类内初始化 Vector 报错解决方案：Expected Parameter Declarator' }; // 更新动态标题
//         // const updateResult = await updatePost(postId, updateData); // 更新动态信息
//         // console.log('更新结果:', updateResult);
//         // const deleteResult = await deletePost(16);  // 删除刚刚插入的动态
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
 * 3. 执行命令 node post.js 运行该脚本
 */


module.exports = {
    insertPost,
    deletePost,
    queryPost,
    updatePost,
    queryCommentsByPostId,
    queryLikesByPostIdWithUsername,
    countLikesByPostId,
    queryAllPosts,
};