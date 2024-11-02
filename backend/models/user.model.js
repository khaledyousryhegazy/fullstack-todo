const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "type a valid email address"],
    },
    password: { type: String, required: true },
    token: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);
module.exports = User;
