# social-app

一个类似狐友的聊天社交 web 网站

## 后端启动项目

后端架构：express （需要有 node.js 环境）

启动命令，在项目根目录处输入

```bash
cd backend  // 进入后端目录
nodemon app  // 启动项目
```



## 连接本地MYSQL

在db.js目录下的index.js文件，里面配置了链接数据库的信息

```js
const mysql = require('mysql2')

// 到时需将这些信息改为自己的
const db = mysql.createPool({ 
    host: 'localhost',   // 定位到本地
    user: 'root',   // 用户名
    password: '123456',  // 密码
    database: 'nodejs'   // 数据库名
})

module.exports = db;
```

目前数据库暂时不支持迁移，请自己在本地创建需要用到的数据表，我后续想想怎么添加迁移功能
