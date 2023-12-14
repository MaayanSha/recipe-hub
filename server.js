require('dotenv').config()
const http = require('http')
const path = require('path')
//import express app
const express = require('express')
const app = express()
//file and logger setup
const fs = require('fs')
const promiseFs = require('fs').promises 
const logEvents = require("./middleware/logEvents")
//load events module
const EventEmitter = require('events')
const cors = require('cors')
const PORT = process.env.PORT || 3500
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')


//create new child class of events module to work on its instances
class Emitter extends EventEmitter { };

//create new instance 
const myEmitter = new Emitter();

/* middleware */
//database
connectDB();
//log the requests
app.use((req, res, next) =>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\n`)
    next()
})

//setup CORS
app.use(cors())
//decode form data in url
app.use(express.urlencoded({extended:false}))

//json support
app.use(express.json())
//static files support
app.use(express.static(path.join(__dirname,"/public")))
app.use("/recipes",express.static(path.join(__dirname,"/public")))



/* routes */

app.use("/", require("./routes/homePage"))
app.use("/recipes", require("./routes/api/recipes"))


//any routing that did not meet any other route
app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
    res.sendFile(path.join(__dirname,"views","404.html"))
    }
    else if (req.accepts('json')){
        res.json({error: "404 not found"})
    }
    else{
        res.type('txt').send("404 not found")
    }
})
mongoose.connection.once('open', ()=>{
    console.log('Connected to DB');
    app.listen(PORT, ()=>console.log(`server running on port ${PORT}`))
})
mongoose.connection.on('error', (err)=>{
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t ${err.syscall}\t ${err.hostname}`, 'mongoErrorLog.log')
})
