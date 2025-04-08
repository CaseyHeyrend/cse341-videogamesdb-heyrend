const Console = require("../models/consoles");

const consolesController = {}

// Get all consoles
consolesController.getAllConsoles = async (req, res) => {
    /*
    #swagger.summary = "Get all Consoles"
    #swagger.description = "Get all consoles from the database."
    #swagger.tags = ['Consoles']


    */
    try {
        const consoles = await Console.find();
        res.status(200).json(consoles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a console by name
consolesController.getConsole = async (req, res) => {
    /*
    #swagger.summary = "Get a Console by Name"
    #swagger.description = "get a console by name from the database."
    #swagger.tags = ['Consoles']
    */
    try {
        const consoleId = req.params.id;
        const consoleData = await Console.findById(consoleId);
        if (!consoleData) {
            return res.status(404).json({ error: "Console not found" });
        }
        res.status(200).json(consoleData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
// Add or update a console
consolesController.addOrUpdateConsole = async (req, res) => {
    /*
    #swagger.summary = "Add (POST) or Update (PUT) a Console"
    #swagger.description = " Add or update a console in the database."
    #swagger.tags = ['Consoles']
    */
    try {
        const { console, company, intro } = req.body;

        // Validation
        if (!console) {
            return res.status(400).json({ error: "Console name must be provided." });
        }

        // Find and update the console if it exists, otherwise insert a new one
        const consoleData = await Console.findOneAndUpdate(
            { console }, // Find console by name
            { console, company, intro },
            { new: true, upsert: true } // Create if not exists, otherwise update
        );

        res.status(200).json({ message: "Console added/updated successfully!", consoleData });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Delete a console
consolesController.deleteConsole = async (req, res) => {
    /*
    #swagger.summary = "Delete a Console"
    #swagger.description = "Delete a console from the database."
    #swagger.tags = ['Consoles']
    */
    try {
        const consoleId = req.params.id;
        const consoleData = await Console.findOneAndDelete(consoleId);
        if (!consoleData) {
            return res.status(404).json({ error: "Console not found" });
        }
        res.status(200).json({ message: "Console deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = consolesController;