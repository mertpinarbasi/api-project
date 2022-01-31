const express = require("express");
const { register, login } = require("../controllers/auth");
const router = express.Router();

router.post("/register", register);

router.get("/", (req, res) => {
  res.send({ status: "done" });
});
router.post("/login", login);

module.exports = router;
