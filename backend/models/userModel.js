const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
