const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router({ mergeParams: true });

const {
  getReservation,
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservations");

// Protect is used to check if the user is logged in
// authorize checks if the user has the required role
router.get("/:id", protect, getReservation);
router.get("/", protect, getReservations);
router.post("/", protect, authorize("admin", "user"), createReservation); // from shops first
router.put("/:id", protect, authorize("admin", "user"), updateReservation);
router.delete("/:id", protect, authorize("admin", "user"), deleteReservation);

module.exports = router;
