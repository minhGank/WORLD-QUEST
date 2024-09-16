const Quest = require("../models/QuestModel");

//search controller for finding the quest
exports.searchResult = async (req, res, next) => {
  try {
    const searchTerm = req.params.searchTerm;
    const result = await Quest.find({
      $or: [
        { city: { $regex: searchTerm, $options: "i" } },
        { province: { $regex: searchTerm, $options: "i" } },
        { country: { $regex: searchTerm, $options: "i" } },
      ],
    }).select("city province country img");

    res.json(result);
    console.log("search Result is running");
  } catch (error) {
    next(error);
  }
};
