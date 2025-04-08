const mongoose = require("mongoose");

const gamesInfoSchema = new mongoose.Schema({
    gameTitle: { type: String, required: true },
    consoles: [{ type: String }],  // Array of consoles
    developer: { type: String },
    publisher: { type: String },
    genre: [{ type: String }],  // Array of genres
    shortSummary: { type: String },
    rating: { type: String },
    releaseDate: { type: Date },  // Convert date format when inserting
    recommended: { type: Boolean },
    __v: { type: Number, select: false } // Exclude __v from the response
});

// Pre-save hook to convert "recommended" field to boolean
gamesInfoSchema.pre("save", function (next) {
    if (typeof this.recommended === "string") {
        this.recommended = this.recommended.toLowerCase() === "yes";
    }
    next();
});


const GamesInfo = mongoose.model("gamesInfo", gamesInfoSchema);
module.exports = GamesInfo;