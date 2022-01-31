const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse.js");
const User = require("../models/User");
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new Error("invalid token"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new Error(err.message));
  }
});
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(user.role)) {
      return next(
        new ErrorResponse(`User role ${req.user.role} is unauthorized`, 403)
      );
    }
    next();
  };
};
