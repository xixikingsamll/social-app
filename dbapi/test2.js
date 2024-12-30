/**
 * 例如，查询用户他发出的所有动态
 *
 * 文件目录结构
 * src
 * │
 * ├───database
 * │   │
 * │   ├───db
 * │   │    ├───index.js
 * │   │    └───表关系示意图.png
 * │   │
 * │   ├───chat.js
 * │   ├───chat_user.js
 * │   ├───comment.js
 * │   ├───like.js
 * │   ├───message.js
 * │   ├───post.js
 * │   └───user.js
 * │
 * ├───test.js
 * └───test2.js（你在此）
 */

const postModule = require('./database/user.js'); // 引入对应的用户数据库操作模块(.js)

/**
 * 测试用户查询他发出的所有动态
 */
async function test() {
    console.log('开始测试');
    const userId = 1; // 假设用户ID为1
    try {
        const userPosts = await postModule.queryPostsByUserId(userId); // 查询该用户发出的所有动态信息
        console.log(`用户ID为 ${userId} 的用户发出的所有动态信息：`, userPosts);
    } catch (err) {
        console.error('查询用户发出的动态失败:', err);
    }
    process.exit();
}

test();


/**
 * 测试方法：
 *
 * 1. 确保电脑已安装Node.js
 * 2. 打开控制台，切换到脚本所在的src目录
 * 3. 执行命令 `node test2.js` 运行该脚本
 */