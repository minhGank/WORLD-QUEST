const mongoose = require("mongoose");

const questSchema = mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  arrayOfImg: [
    {
      type: String,
    },
  ],
  // user: [
  //   {
  //     userInfo: {
  //       type: mongoose.Types.ObjectId,
  //       required: true,
  //       ref: "User",
  //     },
  //     point: {
  //       type: Number,
  //       required: true,
  //       default: 0,
  //     },
  //   },
  // ],
  description: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
    text: true,
  },
  province: {
    type: String,
    required: true,
    text: true,
  },
  country: {
    type: String,
    required: true,
    text: true,
  },
  challenges: [{ type: mongoose.Types.ObjectId, ref: "Challenge" }],
  badges: [{ type: mongoose.Types.ObjectId, ref: "Badge" }],
});

const Quest = new mongoose.model("Quest", questSchema);
module.exports = Quest;
