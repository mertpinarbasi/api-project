const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc Register User
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  // create a new user
  const user = await User.create({ name, email, password, role });

  const token = await user.getSignedJwtToken();
  res.status(200).json({ success: true, token: token });
});

// @desc Login  User
// @route POST /api/v 1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return next(new ErrorResponse("Please enter valid information"));
  }
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("User not found", 401));
  }
  const isValid = await user.matchPassword(password);
  if (!isValid) {
    return next(new ErrorResponse("Incorrect credentials", 401));
  }
  const token = await user.getSignedJwtToken();
  sendTokenResponse(user, res);
});

// create cookie and send response
const sendTokenResponse = (user, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(200)
    .cookie("token", token, options)
    .json({ success: true, token: token });
};
