const mongoose = require("mongoose");

const badgeSchema = mongoose.Schema(
  {
    quest: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Quest",
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    earners: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Badge = new mongoose.model("Badge", badgeSchema);

module.exports = Badge;
