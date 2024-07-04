const userModel = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUpHandler = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ ok: false, message: "User already exists" });
    }

    const newUser = new userModel({
      name: name,
      email: email,
      password: await bcrypt.hash(password, parseInt(process.env.HASH_KEY)),
    });
    await newUser.save();
    return res
      .status(200)
      .json({ ok: true, message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

const signInHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ ok: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      domain: '.vercel.app',
      maxAge: 3600000,
      expires : new Date(Date.now() + 3600000)
    });
    return res.status(200).json({
      ok: true,
      message: "Login Successfully",
      user: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

const checkAuthHandler = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    return res
      .status(200)
      .json({ ok: true, message: "Authorized User", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error" });
  }
};

const logoutHandler = async (req, res) => {
  try {
    res.clearCookie("token",{ sameSite: 'None', secure: true });
    return res.status(200).json({ ok: true, message: "Logout Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

module.exports = {
  signInHandler,
  signUpHandler,
  checkAuthHandler,
  logoutHandler,
};
