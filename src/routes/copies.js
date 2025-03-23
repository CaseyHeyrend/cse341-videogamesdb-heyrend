const express = require("express");
const router = express.Router();
const copiesController = require("../controllers/copiesController");

// GET request for list of all copies
router.get("/copies", copiesController.getCopies);

// GET request for one copy
router.get("/copies/:id", copiesController.getCopy);

// PUT request to add or update a copy
router.put("/copies", copiesController.addOrUpdateCopy);

// DELETE request to delete a copy
router.delete("/copies/:id", copiesController.deleteCopy);

module.exports = router;