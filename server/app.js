require('dotenv').config();
var cookieParser = require('cookie-parser');
const express = require('express');
var cors = require('cors');
const app = express();

// CORS Configuration
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));

// Handle preflight requests explicitly
app.options('*', cors());

// Port
const PORT = process.env.PORT || 3000;

// Database Connection
require('./db/conn');

// JSON Parsing Middleware
app.use(express.json());
app.use(cookieParser());

// Router Port Listening
app.use(require('./router/routh'));

app.listen(PORT, () => {
    console.log(`Server is running at port no ${PORT}`);
});
