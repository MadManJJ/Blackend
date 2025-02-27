const Shop = require("../models/Shop");

// @desc Get one shop
// @route GET /api/v1/shops/:id
// @access Public
exports.getShop = async (req, res, next) => {
  res.status(200).json({ msg: "Shop retrieved successfully" });
};

// @desc Get all shops
// @route GET /api/v1/shops/
// @access Public
exports.getShops = async (req, res, next) => {
  res.status(200).json({ msg: "All shops retrieved successfully" });
};

// @desc Create shop
// @route POST /api/v1/shops/
// @access Private
exports.createShop = async (req, res, next) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(200).json({ success: true, msg: "Create shop", data: shop });
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ success: false });
  }
};

// @desc Update shop
// @route PUT /api/v1/shops/:id
// @access Private
exports.updateShop = async (req, res, next) => {
  res.status(200).json({ msg: "Shop updated successfully" });
};

// @desc Delete shop
// @route DELETE /api/v1/shops/:id
// @access Private
exports.deleteShop = async (req, res, next) => {
  res.status(200).json({ msg: "Shop deleted successfully" });
};
