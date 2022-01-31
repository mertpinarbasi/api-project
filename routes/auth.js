const express = require("express");
const { register, login, getCurrentUser } = require("../controllers/auth");
const router = express.Router();
const { protect } = require("../middleware/auth");
router.post("/register", register);

router.get("/", (req, res) => {
  res.send({ status: "done" });
});
router.post("/login", login);

module.exports = router;
router.get("/me/:id", protect, getCurrentUser);
