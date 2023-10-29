const express = require("express");
const posts = express.Router();
const PostModel = require("../models/post");

// Get all posts
posts.get("/posts", async (req, res) => {
  const { page = 1, pageSize = 6 } = req.query;

  try {
    const posts = await PostModel.find()
      .populate("author", "firstName lastName email avatar birthday")
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const totalPosts = await PostModel.count();

    res.status(200).send({
      statusCode: 200,
      currentPage: Number(page),
      totalPages: Math.ceil(totalPosts / pageSize),
      totalPosts,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

module.exports = posts;
