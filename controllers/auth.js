const User = require("../models/User");

// POST public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, telephone } = req.body;

    const user = await User.create({
      name,
      email,
      role,
      password,
      telephone,
    });

    // const token = user.getSignedJwtToken();
    // res.status(200).json({ success: true, token });
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide an email and password" });
  }

  const user = await User.findOne({ email }).select("+password"); // shorthand for User.findOne({ email : email }).select("+password");

  if (!user) {
    return res.status(400).json({ success: false, msg: "Invalid credentials" });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ success: false, msg: "Invalid credentials" });
  }

  // const token = user.getSignedJwtToken();
  // res.status(200).json({ success: true, token, msg: "Login Successful" });
  sendTokenResponse(user, 200, res);
};

// Get current logged in user @route POST /api/v1/auth/me @access Private
exports.getMe = async (req, res, next) => {
  // use after authmiddleware 'protect'
  // console.log(req.user);
  const user = await User.findById(req.user._id); // come from req.user = await User.findById(decoded.id); inside protect
  res.status(200).json({ success: true, data: user });
};
