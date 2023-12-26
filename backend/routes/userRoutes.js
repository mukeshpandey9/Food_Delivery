const express = require("express");
const {
  registerController,
  loginController,
  authController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Register
router.post("/register", registerController);

// Login
router.post("/login", loginController);

// Auth

router.post("/getUserData", authMiddleware, authController);

module.exports = router;
