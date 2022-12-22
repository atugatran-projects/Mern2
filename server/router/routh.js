const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`Hello world from the server rotuer js`);
});

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
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User Exist" });
    }
    const user = new User({ name, email, phone, password, cpassword });
    const userRegister = await user.save();
    if (userRegister) {
      return res.status(200).json({ Succcess: "User Register Successfully" });
    }else{
      return res.status(422).json({ error: "User Not Register" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
