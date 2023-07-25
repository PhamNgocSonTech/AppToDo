const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {generatorAccessToken, generatorRefreshToken} = require("../services/JWT")

let refreshTokenArr = [];

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        //   validate email, name, password
        if (!(name && email && password)) {
            return res
                .status(400)
                .json({msg: "All Input Require! Please Input Again"});
        }
        const emailCheck = await User.findOne({email: email});
        if (emailCheck) {
            return res.status(400).json({msg: "Email Already Exists"});
        }
        // await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password});
        // create token
        // const token = await user.generateAuthToken();
        // const token = jwt.sign({user_id: user._id, email}, process.env.JWT_KEY, {expiresIn: '10m'})
        res.status(201).json({user});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        // const user = await User.findByCredentials(email, password);
        // if (!user)
        //     return res
        //         .status(404)
        //         .json({error: "Login Failed! Check Authentication Credentials"});
        // // const token = await user.generateAuthToken();
        // const token = jwt.sign({user_id: user._id, email}, process.env.JWT_KEY, {expiresIn: '15m'})
        // user.token = token;
        // res.status(200).json({user, token});

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }

        // Validate if user exists in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            // Save user token
            // user.token = jwt.sign(
            //     {
            //         user_id: user._id,
            //         email
            //     },
            //     process.env.JWT_KEY,
            //     {
            //         expiresIn: process.env.JWT_EXPIRED,
            //     }
            // );
            const accessToken = generatorAccessToken(user);
            const refreshToken = generatorRefreshToken(user);
            refreshTokenArr.push(refreshToken)
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict'
            })
            // Send user response
            return res.status(200).json({user, accessToken});
        }
        // Invalid credentials
        return res.status(400).send("Invalid Credentials");
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const requestRefreshToken = async (req, res) => {
    try {
        const getRefreshToken = req.cookies.refreshToken;
        console.log("Get RT:", getRefreshToken)
        if(!getRefreshToken || !refreshTokenArr.includes(getRefreshToken) ) res.status(401).json("You Can Not Authorization");
        // if(!refreshTokenArr.includes(getRefreshToken)) res.status(401).json("Token Is Valid");

        jwt.verify(getRefreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if(err) {
                res.status(500).json({msg: "Invalid Refresh Token"})
            }
            refreshTokenArr = refreshTokenArr.filter((token) => token !== getRefreshToken)
            const newAccessToken = generatorAccessToken(user);
            const newRefreshToken = generatorRefreshToken(user);

            refreshTokenArr.push(newRefreshToken);

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            })
            res.status(200).json({accessToken: newAccessToken})
        } )
    }catch (err) {
        res.status(500).json({msg: err.message})
    }
}

const logoutUser = async (req, res) => {
    refreshTokenArr = refreshTokenArr.filter((token) => token !== req.body.refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json("Logout Success");
}

module.exports = {registerUser, loginUser, requestRefreshToken, logoutUser};