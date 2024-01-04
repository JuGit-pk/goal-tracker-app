const asyncHandler = require("express-async-handler");
const Goal = require("../models/goal");

// @desc   Get Goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});
// @desc   Create Goal
// @route  POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a new field");
  }
  const goal = await Goal.create({
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
    res.status(400);
    throw new Error("Goal not found");
  }
  await goal.deleteOne();
  //  await Goal.findByIdAndDelete(goalID);
  res.status(200).json({ id: goalID });
});

// @desc   Update Goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goalID = req.params.id;
  const goal = await Goal.findById(goalID);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(goalID, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

module.exports = {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
};
