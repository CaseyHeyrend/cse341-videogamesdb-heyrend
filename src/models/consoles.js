const mongoose = require("mongoose");

const consoleSchema = new mongoose.Schema({
    console: { type: String, required: true },
    company: { type: String },
    intro: { type: Date }
});

const Console = mongoose.model("Console", consoleSchema);
module.exports = Console;