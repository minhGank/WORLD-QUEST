const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  quest: {
    type: mongoose.Types.ObjectId,
    ref: "Quest",
  },
  title: {
    type: String,
    required: true,
    text: true,
  },
  description: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    required: true,
    enum: [1, 3, 5],
  },
  completion: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
      },
      img: {
        type: String,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

const Challenge = new mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
