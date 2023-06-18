//Basic lib import
const express = require('express');
const app = new express();
const bodyParser =require('body-parser');
const morgan = require("morgan");

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Security middleware lib import
const rateLimit =require('express-rate-limit');
const mongoSanitize =require('express-mongo-sanitize');
const helmet =require('helmet');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Database lib import
const mongoose = require('mongoose');
app.use(mongoSanitize());
app.use(express.static('client/build'));
const {readdirSync} = require("fs");
const path = require("path");

//Security middleware implement
app.use(morgan("dev"));
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//Body Parser Implement
app.use(bodyParser.json());

//Request Rate Limit
const limiter = rateLimit({windowMs:15*60*1000, max:3000});
app.use(limiter);

//mongoDB Database Connection
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

//Routing Implement
readdirSync("./src/routes").map(r=>app.use("/api/v1", require(`./src/routes/${r}`)));



// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})


module.exports = app;