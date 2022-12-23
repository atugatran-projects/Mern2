const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Root Req
router.get("/", (req, res) => {
  res.send(`Hello world from the server router.js`);
});

// Register Req
router.post("/register", async (req, res) => {
  // Send Message
  // console.log(req.body);
  // res.json({ message: req.body });
  // **********************************************
  // Save Data to Database
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Hi Plz fill the field" });
  }
  try {
    // If User Exist
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ err: "Password do not Match" });
    } else {
      // Create New User
      const user = new User({ name, email, phone, password, cpassword });
      // Database Save Data
      const userRegister = await user.save();
      // If userRegister or Not
      if (userRegister) {
        return res.status(200).json({ Succcess: "User Register Successfully" });
      } else {
        return res.status(422).json({ error: "User Not Register" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// Login Req
router.post("/signin", async (req, res) => {
  // Send Message
  // console.log(req.body);
  // res.json({ message: req.body });
  // **********************************************
  // Save Data to Database
  try {
    const { email, password } = req.body;
    // If Filled Empty
    if (!email || !password) {
      return res.status(422).json({ error: "Hi Plz fill the field" });
    }
    // its Password Hash
    // if Email Exist in Databasr
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      // check Password
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credienials" });
      } else {
        return res.status(200).json({ Message: "User Login" });
      }
    } else {
      return res.status(400).json({ error: "Invalid Credienials" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
