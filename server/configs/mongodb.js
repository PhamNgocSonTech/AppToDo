const mongoose = require("mongoose");
require("dotenv").config();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
        });
        console.log("Success connected to MongoDB");
    } catch (error) {
        console.log("Failed connect to MongoDB", error.message);
    }
};

module.exports = connectMongoDB;
