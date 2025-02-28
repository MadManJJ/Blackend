const Reservation = require("../models/Reservation");
const Shop = require("../models/Shop");

// @desc Get one reservation
// @route GET /api/v1/reservations/:id
// @access -
exports.getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate({
      path: "shop",
      select: "-_id",
    });
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }

    if (req.user.role !== "admin" && reservation.user != req.user) {
      return res.status(403).json({
        success: false,
        message: `You are not authorize to access this reservation`,
      });
    }

    res.status(200).json({ success: true, data: reservation });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ success: false, msg: "Cannot get reservation" });
  }
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
