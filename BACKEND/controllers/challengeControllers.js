const Challenge = require("../models/ChallengeModel");
const Quest = require("../models/QuestModel");

exports.createChallenge = async (req, res, next) => {
  try {
    const { imgs, title, description, point, questId, address, imgThumbnail } =
      req.body;
    if (
      (!imgs || !title || !description || !point || !questId || !address,
      !imgThumbnail)
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const newChallenge = new Challenge({
      imgThumbnail,
      imgs,
      title,
      description,
      point,
      questId,
      address,
    });

    const quest = await Quest.findById(questId);
    if (!quest) {
      return res.status(404).json({ msg: "no quest found" });
    }
    quest.challenges.push(newChallenge._id);
    await quest.save();
    console.log("new challenge created");
    await newChallenge.save();
    return res.json({
      newChallenge,
    });
  } catch (error) {
    next(error);
  }
};

exports.findChallenge = async (req, res, next) => {
  try {
    const challengeId = req.params.challengeId;
    const challenge = await Challenge.findById(challengeId).populate("questId");
    if (!challenge) {
      return res.json({
        success: false,
        msg: "Can't find this adventure, please try again later",
      });
    }
    return res.json({
      success: true,
      challenge,
    });
  } catch (error) {
    next(error);
  }
};
