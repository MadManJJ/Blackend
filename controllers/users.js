const User = require("../models/User");

// @desc Get all Users
// @route GET /api/v1/users
// @access Private
exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({ success: true, count: user.length, data: user });
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ success: false, msg: "Can not get all Users" });
  }
};

// @desc Get one User
// @route GET /api/v1/user/:id
// @access Private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot find shop with provided ID" });
    }

    if (req.user != user && req.user.role !== "admin") {
      return res
        .status(400)
        .json({
          success: false,
          message: "You are unauthorize to access this information",
        });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ success: false, msg: "Can not get all Users" });
  }
};
