const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");
const Middleware = require("../middleware/middleware");

// Root Request
router.get("/", (req, res) => {
  res.send(`Hello world from the server router.js`);
});

// Register Request
router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  try {
    if (!name || !email || !phone || !password || !cpassword) {
      return res.status(422).json({ error: "Please fill in all fields" });
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User already exists" });
    }

    if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }

    const user = new User({ name, email, phone, password, cpassword });
    const userRegister = await user.save();

    if (userRegister) {
      return res.status(200).json({ success: "User registered successfully" });
    } else {
      return res.status(422).json({ error: "User registration failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Request
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const userLogin = await User.findOne({ email: email });

    if (!userLogin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = await userLogin.generateAuthToken();
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });

    return res.status(200).json({ message: "User login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// About Request
router.get("/about", Middleware, (req, res) => {
  res.send(req.rootUser);
});

// Get Data Request for Contact && Home page
router.get("/getData", Middleware, (req, res) => {
  res.send(req.rootUser);
});

// Contact Request
router.post("/contact", Middleware, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(422).json({ error: "Please fill in all fields" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      return res.status(201).json({ message: "User message sent successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Logout Page
router.get("/logout", (req, res) => {
  console.log("User logout!");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout successful");
});

module.exports = router;
