const User = require("../models/User");

// @desc Get all Users
// @route GET /api/v1/users
// @access Private
exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({ success: true, msg:'Get All Users Successful', count: user.length, data: user });
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
        .status(404)
        .json({ success: false, message: "Cannot find User with provided ID" });
    }

    if (req.user != user && req.user.role !== "admin") {
      return res
        .status(400)
        .json({
          success: false,
          message: "You are unauthorize to access this information",
        });
    }

    res.status(200).json({ success: true, msg:'Get User Successful', data: user });
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ success: false, msg: "Can not get all Users" });
  }
};

// @desc Delete User
// @route DELETE /api/v1/user/:id
// @access Private
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
      return res
        .status(404)
        .json({ success: false, message: "Cannot find User with provided ID" });
    }

    res.status(200).json({ success: true, msg:'Delete successful', data: user });
    
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ success: false, msg: "Can not delete this User" });
  }
}