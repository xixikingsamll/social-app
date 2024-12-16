const mysql = require('mysql2')

// 感谢松杰同学提供的云端数据库
const db = mysql.createPool({
    host: '150.158.190.85',
    user: 'admin',
    password: '12345678',
    database: 'test'
})

module.exports = db;