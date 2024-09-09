const express = require("express");
const router = express.Router();
const questControllers = require("../controllers/questControllers");

router.get("/findQuest/:questId", questControllers.findQuest);

module.exports = router;
