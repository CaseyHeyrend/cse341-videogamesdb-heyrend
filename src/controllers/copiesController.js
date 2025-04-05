const Copy = require("../models/copies");
const copiesController = {};

// Get all copies
copiesController.getAllCopies = async (req, res) => {
    /*
    #swagger.summary = "Get all copies"
    #swagger.description = "Returns all copies in the database"
    #swagger.tags = ['Copies']
    */
    try {
        const copies = await Copies.find();
        res.status(200).json(copies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Get a copy by game title
copiesController.getCopyByGameTitle = async (req, res) => {
    /*
    #swagger.summary = "Get a copy by game title"
    #swagger.description = "Returns a copy by game title"
    #swagger.tags = ['Copies']
    */
    try {
        const { gameTitle } = req.params;
        const copy = await Copies.findOne({ gameTitle });

        if (!copy) {
            return res.status(404).json({ error: "Copy not found" });
        }

        res.status(200).json(copy);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Add or update a copy 
copiesController.addOrUpdateCopy = async (req, res) => {
    /*
    #swagger.summary = "Add or update a copy"
    #swagger.description = "Add or update a copy"
    #swagger.tags = ['Copies']
    */
    try {
        const { downloaded, physical, gameTitle, consoles } = req.body;

        if (!gameTitle || !consoles) {
            return res.status(400).json({ error: "Game title and consoles are required." });
        }

        const copyData = {
            downloaded,
            physical,
            gameTitle,
            consoles
        };

        const copy = await Copies.findOneAndUpdate({ gameTitle }, copyData, { new: true, upsert: true });

        res.status(200).json(copy);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Delete a copy
copiesController.deleteCopy = async (req, res) => {
    /*
    #swagger.summary = "Delete a copy"
    #swagger.description = "Delete a copy"
    #swagger.tags = ['Copies']
    */
    try {
        const { gameTitle } = req.params;
        const copy = await Copies.findOneAndDelete({ gameTitle });

        if (!copy) {
            return res.status(404).json({ error: "Copy not found" });
        }

        res.status(200).json({ message: "Copy deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = copiesController;