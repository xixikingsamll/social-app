const mysql = require('mysql2')

const db = mysql.createPool({
    host: '150.158.190.85',
    user: 'admin',
    password: '12345678',
    database: 'test'
})

module.exports = db;