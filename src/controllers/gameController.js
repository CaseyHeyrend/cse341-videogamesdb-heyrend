const Game = require("../models/game");

const gameController = {}
// Controller to add or update a game
gameController.addOrUpdateGame = async (req, res) => {
        /*
    #swagger.summary = "Add or Update a Game"
    #swagger.description = "Endpoint to add or update a game in the database."
    #swagger.tags = ['Games']
    */
    try {
        const { gameTitle, consoles, developer, publisher, genre, shortSummary, rating, releaseDate, recommended } = req.body;

        // Validation
        if (!gameTitle || !consoles || !developer || !publisher || !genre || !rating || !releaseDate) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        // Ensure consoles and genre are arrays
        if (!Array.isArray(consoles) || !Array.isArray(genre)) {
            return res.status(400).json({ error: "Consoles and genre must be arrays." });
        }

        // Convert recommended to boolean if it's a string
        const recommendedBoolean = typeof recommended === "string" ? recommended.toLowerCase() === "yes" : recommended;

        // Find and update the game if it exists, otherwise insert a new one
        const game = await Game.findOneAndUpdate(
            { gameTitle }, // Find game by title
            {
                gameTitle,
                consoles,
                developer,
                publisher,
                genre,
                shortSummary,
                rating,
                releaseDate: new Date(releaseDate), // Convert releaseDate to Date type
                recommended: recommendedBoolean
            },
            { new: true, upsert: true } // Create if not exists, otherwise update
        );

        res.status(200).json({ message: "Game added/updated successfully!", game });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = gameController;