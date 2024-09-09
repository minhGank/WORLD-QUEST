const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      default:
        "https://vivureviews.com/wp-content/uploads/2022/08/avatar-vo-danh-3-794x1024.webp",
    },
    currentQuest: {
      type: mongoose.Types.ObjectId,
      refer: "Quest",
      default: null,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
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
        ref: "Badge",
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
      googleAuth: { type: Boolean, default: false },
      uid: {
        type: String,
        default: null,
      },
    },
    birthDay: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);
module.exports = User;
