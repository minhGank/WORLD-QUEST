const mongoose = require("mongoose");

const userChallengeSchema = mongoose.Schema({
  completion: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  challengeId: {
    type: mongoose.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  img: {
    type: String,
  },
  text: {
    type: String,
  },
  dateCompleted: {
    type: Date,
  },
});

const UserChallenge = new mongoose.model("UserChallenge", userChallengeSchema);
module.exports = UserChallenge;
