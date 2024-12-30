# social-app

一个类似狐友的聊天社交 web 网站

## 后端启动项目

后端架构：express （需要有 node.js 环境）

启动命令，在项目根目录处输入

```bash
cd backend  // 进入后端目录
nodemon app  // 启动项目
```

## 连接云端 MYSQL

在 db.js 目录下的 index.js 文件，里面配置了链接数据库的信息

```js
const mysql = require("mysql2");

// 感谢松杰同学提供的云端数据库
const db = mysql.createPool({
  host: "150.158.190.85",
  user: "admin",
  password: "12345678",
  database: "test",
});

module.exports = db;
```

## 启动 websocket 服务器

启动命令，在项目根目录处输入

```bash
cd backend  // 进入后端目录
cd router_handler //进入启动项目文件的目录
nodemon websocket  // 启动项目
```
