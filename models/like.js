const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postModel",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("likeModel", likeSchema, "likes");
