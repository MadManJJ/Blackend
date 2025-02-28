const Reservation = require("../models/Reservation");
const Shop = require("../models/Shop");

// @desc Get one reservation
// @route GET /api/v1/reservations/:id
// @access -
exports.getReservation = async (req, res, next) => {
  let query;

  if (req.user.role !== "admin") {
    // If user is not an admin, then they can only see their appointment
    if (req.params.shopId) {
      query = Reservation.find({
        user: req.user.id,
        shop: req.params.shopId,
      }).populate({
        path: "shop",
        select: "name province tel",
      });
    } else {
      query = Reservation.find({ user: req.user.id }).populate({
        path: "shop",
        select: "name province tel",
      });
    }
  } else {
    // If user is an admin, then user can see all
    if (req.params.shopId) {
      console.log(req.params.shopId);
      query = Reservation.find({ shop: req.params.shopId }).populate({
        path: "shop",
        select: "name address telephone openTime closeTime",
      });
    } else {
      query = Reservation.find().populate({
        path: "shop",
        select: "name address telephone openTime closeTime",
      });
    }
  }

  try {
    const reservation = await query;
    res.status(200).json({
      success: false,
      count: reservation.length,
      data: reservation,
    });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Reservation" });
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
