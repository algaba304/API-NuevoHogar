

const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: '1234',
    database: 'escuelas'
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Base de datos conectada!");
});

module.exports = dbConn;