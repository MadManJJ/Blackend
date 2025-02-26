const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const { register, login, getMe } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/getme", protect, getMe);

module.exports = router;
