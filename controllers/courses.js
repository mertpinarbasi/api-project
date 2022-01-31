const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc GET Courses
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  console.log(req.body);
  if (req.body.bootcampId) {
    query = Course.find({ bootcamp: req.body.bootcampId });
  } else {
    query = Course.find();
  }
  const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});
