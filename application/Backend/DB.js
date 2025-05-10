const mysql = require('mysql2/promise');
require('dotenv').config();

const isLocal = process.env.NODE_ENV !== 'production';

const db = mysql.createPool({
    host: isLocal ? process.env.LOCAL_HOST : process.env.DB_HOST,
    user: isLocal ? process.env.LOCAL_USER : process.env.DB_USER,
    password: isLocal ? process.env.LOCAL_PASSWORD : process.env.DB_PASSWORD,
    database: isLocal ? process.env.LOCAL_DB_NAME : process.env.DB_NAME,
    port: isLocal ? process.env.LOCAL_PORT : process.env.DB_PORT || 3306,
    waitForConnections: true
});

module.exports = db;
