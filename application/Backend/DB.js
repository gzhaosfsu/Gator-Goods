const mysql = require('mysql2/promise');
require('dotenv').config();


const db = mysql.createPool({
    // host: process.env.LOCAL_HOST,
    // user: process.env.LOCAL_USER,
    // password: process.env.LOCAL_PASSWORD,
    // database: process.env.LOCAL_DB_NAME

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = db;
