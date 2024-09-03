const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const { generateFromEmail } = require("unique-username-generator");

const inputValidation = (email, password) => {
  if (!email || !password) {
    return { success: false, msg: "Email or Password is missing" };
  }
  const emailValidatorCheck = validator.validate(email);
  if (!emailValidatorCheck) {
    return { success: false, msg: "Email is incorrect" };
  }
  if (password.length < 8) {
    return { success: false, msg: "Password needs to have 8 characters" };
  }
  return { success: true, msg: "Email and Password are good" };
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation inputs
    const inputValidationResult = inputValidation(email, password);
    if (!inputValidationResult.success) {
      return res.json(inputValidationResult);
    }

    //find that user
    const user = await User.findOne({ email: email });
    //check if user is exist
    if (!user) {
      return res.json({
        success: false,
        msg: "Email or Password is incorrect",
      });
    }
    //check if passoword matches with this acc
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.json({
        success: false,
        msg: "Email or Password is incorrect",
      });
    }

    //end of validation, login success
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.cookie("token", token, {
      httpOnly: true, // prevents JavaScript access
      secure: "production", // only sends cookie over HTTPS in production
      sameSite: "strict", // helps prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      success: true,
      msg: "Login success",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validate email and password
    const inputValidationResult = inputValidation(email, password);
    if (inputValidationResult.success == false) {
      return res.json(inputValidationResult);
    }
    //check if email is unique
    const emailUniqueCheck = await User.findOne({ email: email });
    if (emailUniqueCheck) {
      return res.json({
        success: false,
        msg: "Email is already registered, try sign in with normal way or sign in with Google",
      });
    }
    //end of validation, generate username
    const username = generateFromEmail(email, 5);
    //bcrypt password
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      username,
      password: hashPassword,
    });

    await newUser.save();
    //send databack to frontend
    console.log("New user signup");
    return res.status(201).json({ success: true, msg: "Signup succeed" });
  } catch (error) {
    next(error);
  }
};

exports.googleAuth = async (req, res, next) => {
  try {
    const { user } = req.body.result;
    const findUser = await User.findOne({ uid: user.uid });
    if (req.body.result.additionalUserInfo.isNewUser && !findUser) {
      const newUser = new User({
        email: user.email,
        name: user.displayName,
        img: user.photoUrl,
        fromGoogle: { googleAuth: true, uid: user.uid },
        username: generateFromEmail(user.email, 5),
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true, // prevents JavaScript access
        secure: "production", // only sends cookie over HTTPS in production
        maxAge: 86400,
        sameSite: "strict", // helps prevent CSRF attacks
      });
      return res.json({
        success: true,
        msg: "Sign Up With Google Succeed",
        user: newUser,
      });
    } else {
      const token = jwt.sign({ id: findUser._id }, process.env.TOKEN_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true, // prevents JavaScript access
        secure: "production", // only sends cookie over HTTPS in production
        sameSite: "strict", // helps prevent CSRF attacks
        maxAge: 86400,
      });
      return res.json({
        success: true,
        msg: "Sign In With Google Succeed",
        user: findUser,
      });
    }
  } catch (error) {
    next(error);
  }
};
