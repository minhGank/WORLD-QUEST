const User = require("../models/UserModel");
import bcrypt, { hash } from "bcrypt";
const jwt = require("jsonwebtoken");
import createError from "../error";

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check if email, password was filled
    if (!email || !password) {
      return res.json({ status: false, msg: "Email or Password is missing" });
    }

    //find that user
    const user = await User.findOne({ email: email });
    //check if user is exist
    if (!user) {
      return res.json({ status: false, msg: "Email or Password is incorrect" });
    }
    //check if passoword matches with this acc
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.json({
        status: false,
        msg: "Email or Password is incorrect",
      });
    }

    //end of validation, login success
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.json({
      status: true,
      msg: "Login success",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.signup = (req, res, next) => {};
