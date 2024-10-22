const { error } = require("console");
const Challenge = require("../models/ChallengeModel");
const Quest = require("../models/QuestModel");
const Review = require("../models/ReviewModel");

exports.createReview = async (req, res, next) => {
  try {
    const {
      userId,
      challengeId,
      whenDidYouGo,
      reviewTitle,
      reviewText,
      starRating,
    } = req.body;
    const userCheck = await User.findById(userId);
    const challengeCheck = await Challenge.findById(challengeId);

    if (
      !userCheck ||
      !challengeCheck ||
      whenDidYouGo ||
      reviewTitle ||
      reviewText ||
      starRating
    ) {
      return res.json({
        success: false,
        msg: "Please try again later.",
      });
    }
    const newReview = new Review({
      userId,
      challengeId,
      whenDidYouGo,
      reviewTitle,
      reviewText,
      starRating,
    });
    await newReview.save();
    return res.json({ success: true, newReview });
  } catch {
    next(error);
  }
};
