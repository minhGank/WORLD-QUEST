const express = require("express");
const router = express.Router();
import authController from "../controllers/authControllers";

router.post("/auth/login", authController.login);
router.post("/auth/login", authController.signup);

module.exports = router;
