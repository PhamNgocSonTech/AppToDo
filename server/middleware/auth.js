const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

const verifyToken = (req, res, next) => {
  const authToken = req.headers.token || req.body.token || req.query.token;
  if (!authToken) return res.status(403).json("Token Not Found");
  // try {
  const token = authToken;
  jwt.verify(token, process.env.JWT_KEY, (error, user) => {
    if (error) return res.status(400).json("Token Expired");
    req.user = user;
    next();
  });
  // req.user = decoded;
  // } catch (error) {
  //   return res.status(401).json("Invalid Token", error);
  // }
};

module.exports = { verifyToken };
