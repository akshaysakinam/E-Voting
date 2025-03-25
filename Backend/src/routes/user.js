const express = require("express");
const userandadminauth = require("../middlewares/userandadminauth");
const userRouter = express.Router();

// This route returns the authenticated user's data
userRouter.get("/", userandadminauth(), (req, res) => {
  res.json({ user: req.user });
});

module.exports = userRouter;
