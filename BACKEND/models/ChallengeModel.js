const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
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
