const express = require("express");
const posts = express.Router();
const PostModel = require("../models/post");
const LikeModel = require("../models/like");

// Post a like
posts.post("/posts/:postId/like/:userId", async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const existingLike = await LikeModel.findOne({
      post: postId,
      user: userId,
    });
    if (existingLike) {
      return res.status(400).send({ message: "Like already exists" });
    }

    const newLike = new LikeModel({ post: postId, user: userId });
    await newLike.save();

    await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });

    res.status(201).send({ message: "Like added successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Delete a like
posts.delete("/posts/:postId/delete-like/:userId", async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const like = await LikeModel.findOneAndDelete({
      post: postId,
      user: userId,
    });
    if (like) {
      await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
    }

    res.status(200).send({ message: "Like removed successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Get by popularity and date the posts of the week
posts.get("/posts/popular-weekly", async (req, res) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const popularPosts = await PostModel.find({
      createdAt: { $gte: oneWeekAgo },
    })
      .sort({ likeCount: -1 })
      .limit(4)
      .exec();

    res.status(200).send({
      message: "Weekly popular posts fetched successfully",
      popularPosts,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = posts;
