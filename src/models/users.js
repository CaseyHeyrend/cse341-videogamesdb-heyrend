const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String },
    __v: { type: Number, select: false } // Exclude __v from the response
});


const User = mongoose.model("User", userSchema);
module.exports = User;