const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String }
});

var Schema = new Schema({ __v: { type: Number, select: false}});
const User = mongoose.model("User", userSchema);
module.exports = User;