const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit: 10,
    host: process.env.Host,
    user: process.env.User,
    password: process.env.Password,
    database: process.env.Database,
});

module.exports = pool;
