// require the express package
const express = require('express');
// require the mysql package
const mysql = require('mysql2');
// add the PORT designation
const PORT = process.env.PORT || 3001;
// set the app constant to the express package function
const app = express();


// add the express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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

// return all of the data in the candidates table one row at a time
// db.query(`SELECT * FROM candidates`, (err, rows)=>{
//     console.log(rows);
// });

// GET a singel candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err,row)=>{
    if(err){
        console.log (err)
    }
    console.log(row);
});

// Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err,result)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(result);
// });

// create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
                VALUES(?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result)=>{
    if(err){
        console.log(err)
    }
    console.log(result);
});

// create a route to handle request not supported by the app. This has to be the last route
app.use((req,res)=>{
    res.status(404).end();
});


// set up the server to start listening
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});