const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //   validate email, name, password
    if (!(name && email && password)) {
      return res
        .status(400)
        .json({ msg: "All Input Require! Please Input Again" });
    }
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }
    const user = new User({ name, email, password });
    // await user.save();
    const token = await user.generateAuthToken();
    // const token = jwt.sign({userId: user._id, email}, process.env.JWT_KEY, {expiresIn: '5m'})
    user.save();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user)
      return res
        .status(404)
        .json({ error: "Login Failed! Check Authentication Credentials" });
    const token = await user.generateAuthToken();
    // const token = jwt.sign({userId: user._id, email}, process.env.JWT_KEY, {expiresIn: "10m"});
    // user.token = token;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { registerUser, loginUser };
