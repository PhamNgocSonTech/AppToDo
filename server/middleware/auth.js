const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env
const verifyToken = (req, res, next) => {
    const authToken = req.headers["x-access-token"] || req.body.token || req.query.token;
    if (!authToken) return res.status(403).json("Token Not Found");

    // jwt.verify(authToken, config.JWT_KEY, (error, user) => {
    //     if (error) return res.status(400).json("Token Expired");
    //     req.user = user;
    //     next();
    // });
    try {
         // Verify token
        const decode = jwt.verify(authToken, process.env.JWT_KEY);
        // console.log("Decode: ", decode)
        req.user = decode // Save decoded token to request object
    } catch (err) {
        return res.status(401).send("Invalid Token", err); // If token is invalid, return error
    }
    return next(); // If token is valid, continue
};

module.exports = {verifyToken};
