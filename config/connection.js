// Koneksi ke database.
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RS_AQIDAH10',
    database: 'db_testing'
});

conn.connect(function(err) {
    if (err) throw err;
    console.log('Database Terkoneksi!');
});

module.exports = conn;