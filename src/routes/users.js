const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userscontroller");

// Get all users
router.get("/", usersController.getAllUsers);

// Get a user by username
//router.get("/:username", usersController.getUser);

// Get a user by ID
router.get("/:username", usersController.getUser);

// Add or update a user
//router.post("/", usersController.addOrUpdateUser);
// Update a user by username
//router.put("/:username", usersController.addOrUpdateUser);
// Delete a user by username
//router.delete("/:username", usersController.deleteUser);
// Update a user by ID
router.put("/:username", usersController.addOrUpdateUser);

// Delete a user by ID
router.delete("/:username", usersController.deleteUser);


// 🔹 Add a search endpoint for users
router.get("/search", usersController.searchUsers);

module.exports = router;
