const express = require("express");
const router = express.Router();
const challengeControllers = require("../controllers/challengeControllers");
// const verifyToken = require("../middlewares/tokenVerify");

router.post("/createChallenge", challengeControllers.createChallenge);
module.exports = router;
