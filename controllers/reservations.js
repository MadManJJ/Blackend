const Reservation = require("../models/Reservation");
const Shop = require("../models/Shop");

// @desc Get one reservation
// @route GET /api/v1/reservations/:id
// @access -
exports.getReservation = async (req, res, next) => {
  res.status(200).json({ msg: "Reservation retrieved successfully" });
};

// @desc Get all reservations
// @route GET /api/v1/reservations/
// @access -
exports.getReservations = async (req, res, next) => {
  res.status(200).json({ msg: "All reservations retrieved successfully" });
};

// @desc Create reservation
// @route POST /api/v1/reservations/
// @access -
exports.createReservation = async (req, res, next) => {
  res.status(201).json({ msg: "Reservation created successfully" });
};

// @desc Update reservation
// @route PUT /api/v1/reservations/:id
// @access -
exports.updateReservation = async (req, res, next) => {
  res.status(200).json({ msg: "Reservation updated successfully" });
};

// @desc Delete reservation
// @route DELETE /api/v1/reservations/:id
// @access -
exports.deleteReservation = async (req, res, next) => {
  res.status(200).json({ msg: "Reservation deleted successfully" });
};
