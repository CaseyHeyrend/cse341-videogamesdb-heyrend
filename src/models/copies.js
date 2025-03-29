const mongoose = require("mongoose");

const copiesSchema = new mongoose.Schema({
    downloaded: { type: Boolean, required: true },
    physical: { type: Boolean, required: true },
    gameTitle: { type: String, required: true },
    consoles: [{ type: String}] // Array of consoles

});

copiesSchema.pre("save", function (next) {
    if (typeof this.downloaded === "string") {
        this.downloaded = this.downloaded.toLowerCase() === "yes";
    }
    if (typeof this.physical === "string") {
        this.physical = this.physical.toLowerCase() === "yes";
    }
    next();
}
);  

const Copy = mongoose.model("Copies", copiesSchema);
module.exports = Copy;


