const express = require("express");
const router = express.Router();
const consoles = require("../controllers/consolesController");

// Get all consoles
router.get("/", consoles.getAllConsoles);
// Get a console by ID
router.get("/:id", consoles.getConsole);
// Add or update a console
router.post("/", consoles.addOrUpdateConsole);
// Delete a console by ID
router.delete("/:id", consoles.deleteConsole);

module.exports = router;