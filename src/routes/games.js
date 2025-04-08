const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const { auth, requiresAuth } = require('express-openid-connect');

// GET request for list of all games
router.get("/",requiresAuth(), gameController.getAllGames);
//POST Add a new game
router.post("/", requiresAuth(), gameController.addGame);
// GET request for one game
router.get("/:id",requiresAuth(), gameController.getGame);
 // PUT request to add or update a game
router.put("/:id",requiresAuth(), gameController.UpdateGame);
// DELETE request to delete a game
router.delete("/:id",requiresAuth(), gameController.deleteGame);
module.exports = router;