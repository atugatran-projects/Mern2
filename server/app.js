const dotenv = require("dotenv");
// const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Dotenv
dotenv.config({ path: './config.env' });

// Database Connectio
require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

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
