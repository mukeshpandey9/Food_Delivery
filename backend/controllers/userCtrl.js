const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Regsiter Controller

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).send({ message: "Register Successful", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
};

// Login Controller

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Bad credentials", success: false });
    }

    const email = req.body.email;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).send({
      message: "login Successful",
      success: true,
      token,
      data: {
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in login ctrl", success: false });
  }
};

// Autantication

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth Error",
      success: false,
    });
  }
};

module.exports = { registerController, loginController, authController };
