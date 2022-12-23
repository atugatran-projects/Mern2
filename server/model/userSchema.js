const mongooose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongooose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      }
    },
  ],
});
// Passworh Hassing
userSchema.pre("save", async function (next) {
  console.log("Hi this is Middleware");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 13);
    this.cpassword = await bcrypt.hash(this.cpassword, 13);
  }
  next();
});

// Generte Tokken
userSchema.methods.generateAuthToken = async function () { 
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token
  } catch (error) {
    console.log(error);
  }
};

const User = mongooose.model("USER", userSchema);

module.exports = User;
