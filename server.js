// require the express package
const express = require('express');
// require the mysql package
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
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
// get all the candidates
app.get('/api/candidates', (req,res)=>{
    const sql = `SELECT candidates.*, parties.name 
                AS party_name 
                FROM candidates 
                LEFT JOIN parties 
                ON candidates.party_id = parties.id`;

    // return all of the data in the candidates table one row at a time
    db.query(sql, (err, rows)=>{
        if (err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message:'success',
            data: rows
        });
    });
});

// GET a singel candidate
app.get('/api/candidate/:id', (req,res)=>{
    const sql = `SELECT candidates.*, parties.name 
                AS party_name 
                 FROM candidates 
                LEFT JOIN parties 
                ON candidates.party_id = parties.id 
                 WHERE candidates.id = ?`;
                 
    // get the id using the parameter 
    const params = [req.params.id];

    db.query(sql, params, (err,row)=>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Delete a candidate
app.delete('/api/candidate/:id', (req,res)=>{
    const sql = `DELETE FROM candidates WHERE id = ?`;

    const params = [req.params.id];

    db.query(sql, params, (err,result)=>{
        if(err){
            res.statusMessage(400).json({error: res.message});
        } else if (!result.affectedRows){
            res.json({
                message: 'candidate not found'
            })
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Create a candidate
app.post('/api/candidate', ({body}, res)=>{
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors){
        res.status(400).json({error: errors});
        return;
    }
    // database call
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
                    VALUES(?,?,?)`;
    
    const params = [body.first_name, body.last_name, body.industry_connected];
     
    db.query(sql, params, (err, result)=>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});


// create a route to handle request not supported by the app. This has to be the last route
app.use((req,res)=>{
    res.status(404).end();
});


// set up the server to start listening
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});