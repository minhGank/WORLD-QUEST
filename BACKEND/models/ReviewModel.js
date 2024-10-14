const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  questId: {
    type: mongoose.Types.ObjectId,
    ref: "Quest",
    required: true,
  },
  reviewText: {
    type: String,
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
