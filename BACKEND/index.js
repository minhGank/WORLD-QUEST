const express = require("express");
const mongoose = require("mongoose");

const app = express();
const dotenv = require("dotenv");

// get config vars
dotenv.config();
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  console.log(error);
  return res.status(status).json({
    status: status,
    message: message,
  });
});

const server = app.listen(8000, () => {
  console.log("Server connected");
});
