const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

// @desc   Register User
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log({
    name,
    email,
    password,
  });
  if ((!name, !email, !password)) {
    res.status(401);
    throw new Error("Please add all Fields, i.e. password, email, name");
  }
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(401);
    throw new Error("User already Exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("There is error, while creating user.");
  }
});

// @desc   Login User
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // compare the user password with the hash password in the DB
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (user && isPasswordMatched) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc   Get Current User Info
// @route  POST /api/users
// @access Private
const getMe = asyncHandler(async (req, res) => {
  // get the user info from the middleware of the authenticity named as PRIVATE
  const { name, email, id } = await User.findById(req.user.id);
  res.json({
    id,
    name,
    email,
  });
});

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
