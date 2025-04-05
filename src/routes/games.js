const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

// GET request for list of all games
router.get("/", gameController.getAllGames);
// GET request for one game
router.get("/:gameTitle", gameController.getGame);
// POST request to add a new game
router.post("/", gameController.addOrUpdateGame);
 // PUT request to add or update a game
router.put("/:id", gameController.addOrUpdateGame);
// DELETE request to delete a game
router.delete("/:id", gameController.deleteGame);
module.exports = router;