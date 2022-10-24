// Name: Sanchit Sharma
// Student ID: 101331806

// Calling in the required modules for the project
const express = require('express');
const app = express();
const parser = require('body-parser');
const mongoose = require('mongoose');
// Using the files with the routes for employees and users
const employeeRouter = require('./routes/employeeRoute');
const userRouter = require('./routes/userRoute');
// Port number being used for the project
const SERVER_PORT = 4000

// Defining constant connection string for the MongoDB
const DB_URL = "mongodb+srv://iamsanchitsharma:Bushfishfood333@cluster0.geq4lfd.mongodb.net/comp3123_assignment1_db?retryWrites=true&w=majority"

// Middleware configs
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

mongoose.Promise = global.Promise;

// Connecting the module with DB_URL
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("SUCCESS: Server connected to MongoDB Atlas Server.");    
}).catch(error => {
    console.log("FAILURE: Server cannot be connected to the MongoDB Atlas Server.", error);
    process.exit();
});

app.use("/api/emp/", employeeRouter)
app.use("/api/user/", userRouter)

// Route for get request without any params (Home page)
app.route("/").get((req, res)=>{
    res.send("<h1>COMP3123: Full Stack Development Assignment 1</h1><h2>Name: Sanchit Sharma<br>Student ID: 101331806</h2>");
})
    
// Listening to the server using the port number defined (SERVER_PORT) 
app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})
