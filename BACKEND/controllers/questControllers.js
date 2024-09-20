const Quest = require("../models/QuestModel");

//this controller is for finding the quest for current quest of user and fetch all the quest for the Home component
exports.findQuest = async (req, res, next) => {
  try {
    const questId = req.params.questId;
    const quest = await Quest.findById(questId).populate("challenges");
    if (!quest) {
      return res.json({
        success: false,
        msg: "Can't find this quest",
      });
    }
    return res.json({
      success: true,
      quest: quest,
    });
  } catch (error) {
    next(error);
  }
};

//controller when user choose a new quest
exports.chooseCurrentQuest = async (req, res, next) => {
  try {
    const questId = req.params.questId;
    const quest = await Quest.findById(questId).populate("challenges");
    if (!quest) {
      return res.json({
        success: false,
        msg: "Can't find this quest",
      });
    }

    return res.json({
      success: true,
      currentQuest: quest,
    });
  } catch (error) {
    next(error);
  }
};

exports.createQuest = async (req, res, next) => {
  try {
    const { img, country, city, province, description } = req.body;
    const newQuest = new Quest({ img, country, city, province, description });
    await newQuest.save();
    console.log("new quest created");
    return res.json({
      success: true,
      newQuest,
      msg: "New Quest Created",
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllQuest = async (req, res, next) => {
  try {
    const allQuest = await Quest.find();
    return res.json({
      success: true,
      allQuest,
    });
  } catch (error) {
    next(error);
  }
};

exports.addImgsToQuestGallery = async (req, res, next) => {
  try {
    const { imgs, password, questId } = req.body;
    if (password != 23032004) {
      return res.json({ success: false, msg: "You have password to do this" });
    }
    const quest = await Quest.findById(questId);
    if (!quest) {
      return res.json({ success: false, msg: "Quest not found" });
    }
    imgs.forEach((img) => {
      quest.arrayOfImg.push(img);
    });
    await quest.save();
    return res.json({ success: true, quest });
  } catch (error) {
    next(error);
  }
};
