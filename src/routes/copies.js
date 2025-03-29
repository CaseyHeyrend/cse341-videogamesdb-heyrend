const express = require("express");
const router = express.Router();
const copiesController = require("../controllers/copiesController");

// GET request for list of all copies
router.get("/", copiesController.getAllCopies);

// GET request for one copy
router.get("/:id", copiesController.getCopyByGameTitle);

// PUT request to add or update a copy
router.put("/", copiesController.addOrUpdateCopy);

// DELETE request to delete a copy
router.delete("/:id", copiesController.deleteCopy);

module.exports = router;