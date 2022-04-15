// require the mysql package
const mysql = require('mysql2');

// connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // your mysql username,
        user: 'root',
        // Your msql password
        password: 'MySqlSignUp1',
        database: 'election'
    },
    console.log('Connected to the election database')
);

module.exports = db;