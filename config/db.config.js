

const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host: 'localhost',
    port: 3350,
    user: 'root',
    password: 'imgS4RM4*/-',
    database: 'sarma_bd'
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Base de datos conectada!");
});

module.exports = dbConn;