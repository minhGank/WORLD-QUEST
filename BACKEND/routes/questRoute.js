const express = require("express");
const router = express.Router();
const questControllers = require("../controllers/questControllers");

router.get("/findQuest/:questId", questControllers.findQuest);
router.get("/chooseCurrentQuest/:questId", questControllers.chooseCurrentQuest);
router.get("/getAllQuest/", questControllers.getAllQuest);
router.post("/createQuest", questControllers.createQuest);
router.post("/addImgsToQuestGallery", questControllers.addImgsToQuestGallery);
module.exports = router;
