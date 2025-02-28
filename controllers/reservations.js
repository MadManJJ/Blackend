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

// @desc Create reservation
// @route POST /api/v1/reservations/
// @access -
exports.createReservation = async (req, res, next) => {
  try {
    req.body.shop = req.params.shopId; // so that it can populate later (we use req.body to create appointment  )

    const shop = await Shop.findById(req.params.shopId);

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: `No shop with the id of ${req.params.shopId}`,
      });
    }
    console.log(req.body);

    // add user Id to req.body
    req.body.user = req.user.id; // req.user.id come from the middleware protect

    // Check for existed appointment
    const existedReservation = await Reservation.find({ user: req.user.id });

    // If the user is not an admin, they can only create 3 appointment
    if (existedReservation.length >= 3 && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.user.id} has already made 3 reservation`,
      });
    }
    const reservation = await Reservation.create(req.body);

    res.status(201).json({ success: true, data: reservation });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Reservation" });
  }
};

// @desc Update reservation
// @route PUT /api/v1/reservations/:id
// @access -
exports.updateReservation = async (req, res, next) => {
  try {
    let reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }

    // Make sure user is the reservation owner
    if (
      reservation.user.toString() !== req.user.id && // req.user.id come from protect
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this reservation`,
      });
    }

    reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (err) {
    console.log(err.stack);
    res
      .status(500)
      .json({ success: false, message: "Cannot update reservation" });
  }
};

// @desc Delete reservation
// @route DELETE /api/v1/reservations/:id
// @access -
exports.deleteReservation = async (req, res, next) => {
  res.status(200).json({ msg: "Reservation deleted successfully" });
};
