const mongoose = require("mongoose");

const userQuestSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questId: {
    type: mongoose.Types.ObjectId,
    ref: "Quest",
    required: true,
  },
  userChallenges: [
    {
      type: mongoose.Types.ObjectId,
      ref: "UserChallenge",
      required: true,
    },
  ],
  point: {
    type: Number,
    required: true,
    default: 0,
  },
});

const UserQuest = new mongoose.model("UserQuest", userQuestSchema);
module.exports = UserQuest;
