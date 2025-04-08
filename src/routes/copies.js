const express = require("express");
const router = express.Router();
const copiesController = require("../controllers/copiesController");
const { auth, requiresAuth } = require('express-openid-connect');

// GET request for list of all copies
router.get("/", requiresAuth(), copiesController.getAllCopies);

// GET request for one copy
router.get("/:id", requiresAuth(), copiesController.getCopyByGameTitle);

//POST request to add a copy
router.post("/",requiresAuth(), copiesController.addOrUpdateCopy);

// PUT request to add or update a copy
router.put("/", requiresAuth(), copiesController.addOrUpdateCopy);

// DELETE request to delete a copy
router.delete("/:id", requiresAuth(), copiesController.deleteCopy);

module.exports = router;