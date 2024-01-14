require('dotenv').config()
var cookieParser = require('cookie-parser')
const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());

// Port
const PORT = process.env.PORT || 5000;

// Database Connectio
require('./db/conn');
// const User = require('./model/userSchema');

// Listion Json
app.use(express.json());
app.use(cookieParser())

// Router Port Listoning
app.use(require('./router/routh'));

// Middelware 
// const middleware = (req,res, next) => {
//     console.log(`Hello my Middleware`);
//     next();
// }

app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
})
