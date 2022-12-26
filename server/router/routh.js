const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const Middleware = require("../middleware/middleware");
const { response } = require("express");

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
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ error: "Hi Plz fill the field" });
    }
    // its Password Hash
    // if Email Exist in Databasr
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      // Set Cookies
      const token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });
      // check Password
      const isMatch = await bcrypt.compare(password, userLogin.password);
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

//? Login Req
router.get("/about", Middleware, (req, res) => {
  //? Send Message
  //* console.log("Hello this is About");
  res.send(req.rootUser);
  //* console.log("This is Your Tokken ====>" + req.token);
  //* console.log("This is Your user ====>" + req.rootUser);
  //* res.send(req.token);
  //* res.send("hi this is About");
});

// Get Data for Contact && Home page
router.get("/getData", Middleware, (req, res) => {
  // Send Message
  // console.log("Hello this is getData");
  res.send(req.rootUser);
});

// Contact Req
router.post("/contact", Middleware, async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("Plzz Enter This Fields");
      return res.status(422).json({ error: "Hi Plz fill the field" });
    }
    const userContact = await User.findOne({ _id: req.userID });
    console.log(userContact);
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "User Message Sent Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Logout Page
router.get("/logout", (req, res) => {
  //? Send Message
  console.log("Hello this is logout!");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});

module.exports = router;
