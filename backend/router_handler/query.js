const db = require('../db/index');

async function queryAll(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('SQL语句执行出错:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports={
    queryAll
};