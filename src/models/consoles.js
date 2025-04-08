const mongoose = require("mongoose");

const consoleSchema = new mongoose.Schema({
    console: { type: String, required: true },
    company: { type: String },
    intro: { type: Date }
    
});
var Schema = new Schema({ __v: { type: Number, select: false}});
const Console = mongoose.model("Console", consoleSchema);

module.exports = Console;