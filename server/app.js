require("dotenv").config();
var cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();

// Port
const PORT = process.env.PORT || 5000;

// Database Connectio
require("./db/conn");

// Resource using app
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Router
app.use(require("./router/routh"));

// Router Port Listoning
app.listen(PORT, () => {
  console.log(`server is runnig at port no http://localhost:${PORT}`);
});
