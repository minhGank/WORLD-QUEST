const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.get("/findQuest/:searchTerm", userController.searchResult);

module.exports = router;
