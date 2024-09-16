const Challenge = require("../models/ChallengeModel");
const Quest = require("../models/QuestModel");

exports.createChallenge = async (req, res, next) => {
  try {
    const { img, title, description, point, questId } = req.body;
    if (!img || !title || !description || !point || !questId) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const newChallenge = new Challenge({
      img,
      title,
      description,
      point,
      questId,
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
