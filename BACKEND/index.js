const express = require("express");
const mongoose = require("mongoose");

const app = express();

const server = app.listen(8000, () => {
  console.log("Server connected");
});
