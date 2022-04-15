// require the express package
const express = require('express');
// require the connection js file for the database
const db = require('./db/connection');
// require the folder where all fo the routes live
const apiRoutes = require('./routes/apiRoutes');

const inputCheck = require('./utils/inputCheck');
// add the PORT designation
const PORT = process.env.PORT || 3001;
// set the app constant to the express package function
const app = express();


// add the express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// add the api expression so that you don't have to use it in the route call
app.use('/api', apiRoutes);



// create a route to handle request not supported by the app. This has to be the last route
app.use((req,res)=>{
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// set up the server to start listening
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});