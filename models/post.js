const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("postModel", postSchema, "posts");
