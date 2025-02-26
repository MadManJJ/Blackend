const User = require("../models/User");

exports.register = async (req, res, next) => {
  res.status(200).json({ msg: "User registered successfully" });
};

exports.login = async (req, res, next) => {
  res.status(200).json({ msg: "Login Successful" });
};

exports.getMe = async (req, res, next) => {
  res.status(200).json({ msg: "User details retrieved successfully" });
};
