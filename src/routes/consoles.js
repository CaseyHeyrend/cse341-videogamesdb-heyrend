const express = require("express");
const router = express.Router();
const consoles = require("../controllers/consolesController");
const { auth, requiresAuth } = require('express-openid-connect');

// Get all consoles
router.get("/", requiresAuth(), consoles.getAllConsoles);
// Update a console
router.put("/", requiresAuth(), consoles.addOrUpdateConsole);
// Get a console by ID
router.get("/:id", requiresAuth(), consoles.getConsole);
// Add or update a console
router.post("/", requiresAuth(), consoles.addOrUpdateConsole);
// Delete a console by ID
router.delete("/:id", requiresAuth(), consoles.deleteConsole);

module.exports = router;