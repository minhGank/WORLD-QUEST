const express = require("express");
const router = express.Router();
const challengeControllers = require("../controllers/challengeControllers");
// const verifyToken = require("../middlewares/tokenVerify");

router.post("/createChallenge", challengeControllers.createChallenge);
router.get("/findChallenge/:challengeId", challengeControllers.findChallenge);

module.exports = router;
