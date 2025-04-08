const express = require("express");
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

// Require controller modules.

router.use("/games", requiresAuth("./games"));
router.use("/consoles", requiresAuth("./consoles"));
router.use("/users", requiresAuth("./users"));
router.use("/copies", requiresAuth("./copies"));

module.exports = router;
