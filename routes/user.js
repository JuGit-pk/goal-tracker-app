const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../controllers/user");
const { protect } = require("../middlewares/auth");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
