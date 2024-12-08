const mysql = require('mysql2')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodejs'
})

// 开发人员1
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'nodejs'
// })

// 开发人员2
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'nodejs'
// })



module.exports = db;