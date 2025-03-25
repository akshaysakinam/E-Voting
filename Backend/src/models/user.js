const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      lowercase: true, // Convert to lowercase
      required: true,
      unique: true,
      trim: true, // Remove spaces
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    rollno: {
      type: String,
      unique: true,
      validate: {
        validator: function (value) {
          if (this.role === "student" && !value) {
            throw new Error("Roll no is required for students.");
          }
          if (this.role === "admin" && value) {
            throw new Error("Admins should not have a roll number.");
          }
          return true;
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password");
        }
      },
    },
    role: { type: String, enum: ["admin", "student"], required: true },

    section: {
      type: String,
      validate: {
        validator: function (value) {
          if (this.role === "student" && !value) {
            throw new Error("Section is required for students.");
          }
          if (this.role === "admin" && value) {
            throw new Error("Admins should not have a section.");
          }
          return true;
        },
      },
    },

    year: {
      type: String,
      validate: {
        validator: function (value) {
          if (this.role === "student" && !value) {
            throw new Error("Year is required for students.");
          }
          if (this.role === "admin" && value) {
            throw new Error("Admins should not have a year.");
          }
          return true;
        },
      },
    },
  },
  { timestamps: true }
);


userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const hashedPassword = user.password;
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
