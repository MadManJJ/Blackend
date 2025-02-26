const Shop = require("../models/Shop");

// @desc Get one shop
// @route GET /api/v1/shop/:id
// @access Public
exports.getShop = async (req, res, next) => {
  res.status(200).json({ msg: "Shop retrieved successfully" });
};

// @desc Get all shops
// @route GET /api/v1/shop/
// @access -
exports.getShops = async (req, res, next) => {
  res.status(200).json({ msg: "All shops retrieved successfully" });
};

// @desc Create shop
// @route POST /api/v1/shop/
// @access -
exports.createShop = async (req, res, next) => {
  res.status(201).json({ msg: "Shop created successfully" });
};

// @desc Update shop
// @route PUT /api/v1/shop/:id
// @access -
exports.updateShop = async (req, res, next) => {
  res.status(200).json({ msg: "Shop updated successfully" });
};

// @desc Delete shop
// @route DELETE /api/v1/shop/:id
// @access -
exports.deleteShop = async (req, res, next) => {
  res.status(200).json({ msg: "Shop deleted successfully" });
};
