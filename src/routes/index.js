const express = require("express");
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

// Require controller modules.

router.use("/games", require("./games"));
router.use("/consoles", require("./consoles"));
router.use("/users", require("./users"));
router.use("/copies", require("./copies"));

module.exports = router;
