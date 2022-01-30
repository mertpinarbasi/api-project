const errorHandler = (err, req, res, next) => {
  // Log to console
  console.log(err.stack.red);
  res.status(err.statusCode).json({
    success: false,
    error: err.message || "Fail",
    status: 200,
  });
};
module.exports = errorHandler;