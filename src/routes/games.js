const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const {requiresAuth } = require('express-openid-connect');

// GET request for list of all games
router.get("/",requiresAuth(), gameController.getAllGames);
// GET request for one game
router.get("/:id", gameController.getGame);
// POST request to add a new game 
router.put("/", requiresAuth(),gameController.addOrUpdateGame);
 // PUT request to add or update a game
router.put("/:id",requiresAuth(), gameController.addOrUpdateGame);
// DELETE request to delete a game
router.delete("/:id", requiresAuth(),gameController.deleteGame);
module.exports = router;