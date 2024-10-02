const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  websiteUrl: {
    type: String,
  },
  averageReviewStar: {
    type: Number,
  },
  openHour: {
    type: String,
    required: true,
  },
  reviewCount: {
    type: Number,
  },

  imgThumbnail: {
    type: String,
    required: true,
  },
  imgs: [
    {
      type: String,
    },
  ],
  address: {
    googleUrl: {
      type: String,
      required: true,
    },
    actualAddress: {
      type: String,
      required: true,
    },
  },
  questId: {
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
      review: {
        reviewStar: {
          type: Number,
          enum: [1, 2, 3, 4, 5],
        },
        reviewText: {
          type: String,
        },
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
