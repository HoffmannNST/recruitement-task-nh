module.exports = function () {
    let mysql = require('mysql2');
    let conn = mysql.createConnection({
        host: 'host', 
        user: 'user',      
        password: 'password',      
        database: 'db' 
    }); 

    conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
    });

    return conn
}