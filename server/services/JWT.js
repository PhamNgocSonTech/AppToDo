const jwt= require('jsonwebtoken');
require("dotenv").config();
const generatorAccessToken = (user) => {
    const secretKey = process.env.JWT_KEY;
    const expireTime = process.env.JWT_EXPIRED;
    const userData = {
        user_id: user._id,
        email: user.email
    }
    try {
        const accessToken = jwt.sign(userData, secretKey, {expiresIn: expireTime});
        user.token = accessToken
        console.log("Generate Access Token", accessToken)
        return accessToken;
    }catch (err) {
        console.log("Can Not Generate Access Token", err);
        throw new Error("Could Not Generate Access Token");
    }
}

const generatorRefreshToken = (user) => {
    const secretKey = process.env.JWT_REFRESH_KEY;
    const expireTime = process.env.RT_EXPIRED;
    const userData = {
        user_id: user._id,
        email: user.email,
    }
    try {
        const refreshToken = jwt.sign(userData, secretKey, {expiresIn: expireTime})
        return refreshToken;
    }catch (err) {
        console.log("Can Not Generate Refresh Token", err)
        throw new Error("Could Not Generate Refresh Token");

    }
}


module.exports = {generatorAccessToken, generatorRefreshToken}