const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      // extracting the token string
      token = authHeader.split(" ")[1];
      // verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      // this user is from the decoding id and findings
      // then set the variable in the request to accecible for the other middlewares or the controllers
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({
          message: "Invalid token",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(401).json({
        message: "Invalid token",
      });
    }
  } else {
    res.status(401).json({
      message: "Invalid token",
    });
  }
});

module.exports = { protect };
