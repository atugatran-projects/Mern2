require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// CORS Configuration
app.use(cors({
    origin: ['https://atugatran-projects.github.io','http://localhost:3000'],
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
