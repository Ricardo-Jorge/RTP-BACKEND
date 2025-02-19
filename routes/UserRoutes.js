const express = require("express");
const router = express.Router();

// Controller
const { register, login, update } = require("../controllers/userController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.put("/update", authGuard, userUpdateValidation(), validate, update);

module.exports = router;
