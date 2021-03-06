const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
// Route files
const bootcamps = require("./routes/bootcamp");
const courses = require("./routes/courses");
const auth = require("./routes/auth");

// Load env variables
dotenv.config({
  path: "./config/config.env",
});
// Server initialization
const app = express();

// Body parser middleware
app.use(express.json());
app.use(cookieParser());

// Database connection
connectDB();
// Developer Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Router
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use(errorHandler);
// Port configuration
const PORT = process.env.PORT || 5000;

// Connect to the port
app.listen(PORT, () => {
  console.log(`Server running in mode on port ${PORT}`);
});
