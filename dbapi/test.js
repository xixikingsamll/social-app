/**
 * 例如，插入一则新动态
 *
 * 假设你的文件目录树是这样的。
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
 * └───test.js（你在此）
 */

const postModule = require('./database/post.js');

/**
 * 测试插入一则新动态
 */
async function test() {
    console.log('k');
    const newPost = {
        user_id: 1,
        user_avatar: 'https://example.com/avatar1.jpg',
        title: '如何在JavaScript中实现深拷贝',
        content: '...（省略内容）'
    };
    try {
        const postId= await postModule.insertPost(newPost);  // 插入新动态并获取其ID
        const result = await postModule.queryPost(postId);  // 根据ID查询新插入的动态信息
        console.log('查询结果：', result);

        // const results = await postModule.queryAllPosts();  // 查询post表中全部动态信息
        // console.log('查询结果：', results);
    } catch (err) {
        console.error('操作失败:', err);
    }
    process.exit();
}

test();


/**
 * 测试方法：
 *
 * 1. 确保电脑已安装Node.js
 * 2. 打开控制台，切换到脚本所在的src目录
 * 3. 执行命令 `node test.js` 运行该脚本
 */

