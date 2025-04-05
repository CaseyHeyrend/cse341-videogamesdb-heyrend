const Game = require("../models/game");

const gameController = {}
// Get all games
gameController.getAllGames = async (req, res) => {
    /*
    #swagger.summary = "Get all games"
    #swagger.description = "Returns all games in the database"
    #swagger.tags = ['Games']
    */
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Get a game by ID
gameController.getGame = async (req, res) => {
    /*
    #swagger.summary = "Get a game by ID"
    #swagger.description = "Returns a game by its ID"
    #swagger.tags = ['Games']
    */
    try {
        const gameId = req.params.id;
        const game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ error: "Game not found" });
        }
        res.status(200).json(game);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
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
// Controller to delete a game by ID
gameController.deleteGame = async (req, res) => {
    /*
    #swagger.summary = "Delete a game by ID"
    #swagger.description = "Deletes a game by its ID"
    #swagger.tags = ['Games']
    */
    try {
        const gameId = req.params.id;
        const game = await Game.findByIdAndDelete(gameId);
        if (!game) {
            return res.status(404).json({ error: "Game not found" });
        }
        res.status(200).json({ message: "Game deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = gameController;