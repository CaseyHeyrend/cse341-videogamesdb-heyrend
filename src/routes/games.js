const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

// PUT request to add or update a game
router.put("/:id", gameController.addOrUpdateGame);

module.exports = router;