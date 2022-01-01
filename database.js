let mysql = require('mysql2');
let conn = mysql.createConnection({
  host: 'us-cdbr-east-05.cleardb.net', 
  user: 'user',      
  password: 'password',      
  database: 'db' 
}); 

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

module.exports = conn;