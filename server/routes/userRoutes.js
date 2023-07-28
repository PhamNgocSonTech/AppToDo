const express = require("express");
const router = express.Router();
const {registerUser, loginUser, requestRefreshToken, logoutUser} = require("../controllers/userController");
const {verifyToken} = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refreshToken", verifyToken, requestRefreshToken)

module.exports = router;
