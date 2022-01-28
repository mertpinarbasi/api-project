const express = require("express");
const dotenv = require("dotenv");
// Load env variables
dotenv.config({
  path: "./config/config.env",
});
// Server initialization
const app = express();

// Port configuration
const PORT = process.env.PORT || 5000;

// Connect to the port
app.listen(PORT, `Server running in mode on port ${process.env.PORT}`);
