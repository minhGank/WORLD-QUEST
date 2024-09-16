const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "Please Login To Be Able To Do This",
      });
    }
    const tokenVerify = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = tokenVerify;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      msg: "Invalid or expired token",
    });
  }
};
