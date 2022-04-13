// require the express package
const express = require('express');
// add the PORT designation
const PORT = process.env.PORT || 3001;
// set the app constant to the express package function
const app = express();

// add the express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// // create the GET test route
// app.get('/', (req,res)=>{
//     res.json({
//         message: "Hello World"
//     });
// });

// create a route to handle request not supported by the app. This has to be the last route
app.use((req,res)=>{
    res.status(404).end();
});


// set up the server to start listening
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});