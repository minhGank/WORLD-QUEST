const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "Quest",
    required: true,
  },
  whenDidYouGo: {
    type: Date,
    required: true,
  },
  challengeId: {
    type: mongoose.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  reviewTitle: {
    type: String,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  startRating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  imgUrl: [
    {
      type: String,
    },
  ],
});

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
