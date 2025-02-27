const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const { register, login, getMe, logout } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/getme", protect, getMe);
router.get("/logout", logout);

module.exports = router;
