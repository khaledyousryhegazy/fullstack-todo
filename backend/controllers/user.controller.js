const User = require("../models/user.model");
const jwtGenerator = require("../utils/jwtGenerator");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const count = await User.countDocuments();

    const users = await User.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    return res.status(200).json({
      success: true,
      data: users,
      meta: {
        totalUsers: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page, 10),
      },
    });
  } catch (error) {
    console.error(`Error fetching users: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, msg: "Server error. Please try again later." });
  }
};

// register new user
const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    // Check if the email is valid
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, msg: "Please enter a valid email" });
    }

    // Check if the user already exists
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res
        .status(400)
        .json({ success: false, msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const userToken = await jwtGenerator({
      email: email,
      userName: userName,
      _id: newUser._id,
    });

    newUser.token = userToken;

    await newUser.save();

    res.status(201).json({
      success: true,
      msg: "User Register Successfully",
      newUser: newUser,
    });
  } catch (error) {
    console.error(`Error fetching users: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, msg: "Server error. Please try again later." });
  }
};

// delete user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(500)
        .json({ success: false, msg: "please enter email and password." });
    }

    const user = await User.findOne({ email: email });
    const passwordVerify = await bcrypt.compare(password, user.password);

    if (user && passwordVerify) {
      const token = await jwtGenerator({
        email: user.email,
        userName: user.userName,
        _id: user._id,
      });

      res.status(200).json({
        success: true,
        msg: "login successfully",
        user: { user },
        token: token,
      });
    } else {
      res
        .status(500)
        .json({ success: false, msg: "please check the email and password" });
    }
  } catch (error) {
    console.error(`Error fetching users: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, msg: "Server error. Please try again later." });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    console.error(`Error fetching users: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, msg: "Server error. Please try again later." });
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
  deleteUser,
};
