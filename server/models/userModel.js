const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
    },

    token: {
        type: String,
    },

});

userSchema.pre("save", async function (next) {
    try {
        const user = this;
        if (!user.isModified("password")) next();
        const hashPassword = await bcrypt.hash(user.password, 10);
        this.password = hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({
            user_id: user._id,
            email: user.email
        },
        process.env.JWT_KEY,
        {
            expiresIn: "15m",
        }
    );
    user.token = token;
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error({error: "Invalid Login Email"});
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({error: "Invalid Login Password"});
    }
    return user;
};
const User = mongoose.model("Users", userSchema);
module.exports = User;
