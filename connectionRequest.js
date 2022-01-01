module.exports = function () {
    let mysql = require('mysql2');
    let conn = mysql.createConnection({
        host: HOST_SECRET_NAME, 
        user: USER_SECRET_NAME,      
        password: SECRET_PASSWORD,      
        database: DB_SECRET_NAME 
    }); 

    conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
    });

    return conn
}