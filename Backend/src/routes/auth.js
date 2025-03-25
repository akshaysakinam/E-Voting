const express = require("express");
const bcrypt = require("bcrypt");
const validator=require('validator')
const User = require("../models/user");
const userandadminauth = require("../middlewares/userandadminauth");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, rollno, password, role, section, year } = req.body;

    // Check if role is valid
    if (!["student", "admin"].includes(role)) {
      return res
        .status(400)
        .json({ msg: "Invalid role. Must be 'student' or 'admin'." });
    }

    // Validate required fields based on role
    if (role === "student") {
      if (!rollno || !section || !year) {
        return res.status(400).json({
          msg: "Students must provide roll number, section, and year",
        });
      }
    }

    if (role === "admin") {
      if (rollno || section || year) {
        return res.status(400).json({
          msg: "Admins should not provide roll number, section, or year",
        });
      }
    }

    const passwordhash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: passwordhash,
      role,
      ...(role === "student" && { rollno, section, year }), // Only add these fields for students
    });

    await user.save();
    res.json({ msg: "User created successfully", user });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Please enter valid email");
    }

    const user = await User.findOne({email});
    if (!user) {
      throw new Error("Please enter valid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
    //   console.log(token);
      //   send cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only use secure in production
        sameSite: "Lax", // Lax is generally a good default
      });
      

      res.json({msg:"Login Successful",user})

    }
  } catch (error) {
    // console.log(error)
    return res.status(400).json({ msg: error });
  }
});


authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
  res.status(200).json({ msg: "Logged out successfully" });
});

authRouter.get("/user", userandadminauth, async (req, res) => {
  // At this point, req.user is set by the middleware
  res.json({ user: req.user });
});


module.exports = authRouter;
