const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri); // ✅ No extra options needed
        console.log("MongoDB Connected via Mongoose");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;