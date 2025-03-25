const express = require("express");
const User = require("../models/user");

const eligibleStudentsRouter = express.Router();

// GET /eligible-students
eligibleStudentsRouter.get("/eligible-students", async (req, res) => {
  try {
    // Find all users with role "student"
    const students = await User.find({ role: "student" }).select("_id name email");
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = eligibleStudentsRouter;
