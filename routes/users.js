const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

const { getUsers, getUser } = require("../controllers/users");

router.get("/", protect, authorize("admin"), getUsers);
router.get("/:id", protect, getUser);

module.exports = router;
