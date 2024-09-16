const express = require("express");
const router = express.Router();
const questControllers = require("../controllers/questControllers");

router.get("/findQuest/:questId", questControllers.findQuest);
router.get("/chooseCurrentQuest/:questId", questControllers.chooseCurrentQuest);
router.get("/getAllQuest/", questControllers.getAllQuest);
router.post("/createQuest", questControllers.createQuest);
module.exports = router;
