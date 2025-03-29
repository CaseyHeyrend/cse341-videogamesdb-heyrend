const express = require("express");
const router = express.Router();

// Require controller modules.

router.use("/games", require("./games"));
router.use("/consoles", require("./consoles"));
router.use("/users", require("./users"));
router.use("/copies", require("./copies"));

module.exports = router;
