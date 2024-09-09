const Quest = require("../models/QuestModel");

exports.findQuest = async (req, res, next) => {
  try {
    const questId = req.params.questId;
    const quest = await Quest.findById(questId);
    const allTheQuest = await Quest.find();
    if (!quest) {
      return res.json({
        success: false,
        msg: "Can't find this quest",
      });
    }
    return res.json({
      success: true,
      quest: quest,
      allTheQuest,
    });
  } catch (error) {
    next(error);
  }
};
