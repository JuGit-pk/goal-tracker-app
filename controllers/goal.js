const asyncHandler = require("express-async-handler");
const Goal = require("../models/goal");

// @desc   Get Goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(201).json(goals);
});
// @desc   Create Goal
// @route  POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(401);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    user: req.user.id, // user form the middleware
    text: req.body.text,
  });
  res.status(201).json(goal);
});

// @desc   Delete Goals
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goalID = req.params.id;
  const goal = await Goal.findById(goalID);
  if (!goal) {
    res.status(401);
    throw new Error("Goal not found");
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await goal.deleteOne();
  //  await Goal.findByIdAndDelete(goalID);
  res.status(201).json({ id: goalID });
});

// @desc   Update Goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goalID = req.params.id;
  const goal = await Goal.findById(goalID);
  if (!goal) {
    res.status(401);
    throw new Error("Goal not found");
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(goalID, req.body, {
    new: true,
  });
  res.status(201).json(updatedGoal);
});

module.exports = {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
};
