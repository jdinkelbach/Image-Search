const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit: 10,
    host: "r1bsyfx4gbowdsis.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "idjcuji6udwcgx0j",
    password: "tdh3hnvr4gbdc07x",
    database: "htka2kai02ypyrlg"
});

module.exports = pool;
