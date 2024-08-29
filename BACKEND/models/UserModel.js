const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    badges: [
      {
        type: mongoose.Types.ObjectId,
        ref: "badge",
      },
    ],
    homeTown: {
      type: String,
      default: null,
    },
    quests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Quest",
      },
    ],
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);
module.exports = User;
