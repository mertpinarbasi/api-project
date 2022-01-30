const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const morgan = require("morgan");
const connectDB = require("./config/db");
// Route files
const bootcamps = require("./routes/bootcamp");

// Load env variables
dotenv.config({
  path: "./config/config.env",
});
// Server initialization
const app = express();

// Database connection
connectDB();
// Developer Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/bootcamps", bootcamps);
// Port configuration
const PORT = process.env.PORT || 5000;

// Connect to the port
app.listen(PORT, () => {
  console.log(`Server running in mode on port ${PORT}`);
});
