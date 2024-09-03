const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      default:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
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
