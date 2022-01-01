require('dotenv').config()

module.exports = function () {
    const mysql = require('mysql2')
    const conn = mysql.createConnection({
        host: process.env.HOST_NAME,
        user: process.env.USER_NAME,      
        password: process.env.DB_PASSWORD,      
        database: process.env.DB_NAME 
    }); 

    conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !')
    });

    return conn
}