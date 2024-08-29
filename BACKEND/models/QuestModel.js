const mongoose = require("mongoose");

const questSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  point: {
    type: Number,
    required: true,
    default: 0,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  challenges: [{ type: mongoose.Types.ObjectId, ref: "Challenge" }],
  badges: [{ type: mongoose.Types.ObjectId, ref: "Badge" }],
});

const Quest = new mongoose.model("Quest", questSchema);
module.exports = Quest;
