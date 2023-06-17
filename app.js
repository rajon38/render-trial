//basic lib import
const { readdirSync } = require("fs");
const path = require("path")
const express = require("express");
const app = express();
const mongoSanitize =require('express-mongo-sanitize');
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require('express-rate-limit');
const bodyParser =require('body-parser');

//middleware
const xss =require('xss-clean');
const hpp =require('hpp');
app.use(xss())
app.use(hpp())
app.use(cors());
app.use(mongoSanitize());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// Body Parser Implement
app.use(bodyParser.json())

//request rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

//mongodb connection
let URI="mongodb+srv://<username>:<password>@cluster0.aw6azwi.mongodb.net/ostad-com?retryWrites=true&w=majority";
let OPTION={user:'rashedul',pass:'170174Rajon',autoIndex:true}
mongoose
    .set('strictQuery',true)
    .connect(URI,OPTION)
    .then(()=>{
        console.log('Connected to DB')
    })
    .catch((err)=>{
        console.log(err.message)
    });

//routing implement
readdirSync("./src/routes").map(r => app.use("/api/v1", require(`./src/routes/${r}`)));

//undefined route implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})

// Add React Front End Routing


module.exports = app;