const asyncHandler = require("express-async-handler");

// @desc   Get Goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "GET goals",
  });
});
// @desc   Create Goal
// @route  POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a new field");
  }
  console.log(req.body);
  res.status(201).json({
    message: "POST goals",
  });
});

// @desc   Delete Goals
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `DELETE GOAL ${req.params.id}`,
  });
});

// @desc   Update Goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `UPDATE GOAL ${req.params.id}`,
  });
});

module.exports = {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
};
