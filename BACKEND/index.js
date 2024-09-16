//import library
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//import routes
const authRoute = require("./routes/authRoute");
const questRoute = require("./routes/questRoute");
const challengeRoute = require("./routes/challengeRoute");
const userRoute = require("./routes/userRoute");

//app.use libray and set up library
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);

//app.use routes
app.use("/auth/", authRoute);
app.use("/quest/", questRoute);
app.use("/challenge/", challengeRoute);
app.use("/user/", userRoute);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  console.log(error);
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8000, () => {
  console.log("Server connected");
});
