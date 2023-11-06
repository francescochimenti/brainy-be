const express = require("express");
const posts = express.Router();
const PostModel = require("../models/post");

// Get all posts
posts.get("/posts", async (req, res) => {
  const { page = 1, pageSize = 50 } = req.query;

  try {
    const posts = await PostModel.find()
      .populate("author")
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

// Create a post

posts.post("/posts/create", async (req, res) => {
  const newPost = new PostModel({
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const post = await newPost.save();
    res.status(201).send({
      statusCode: 201,
      message: "Post creado exitosamente",
      post,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

// Get a post by id

posts.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id).populate("author");

    if (!post) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post no encontrado",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Post encontrado",
      post,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

// Delete a post by id

posts.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post no encontrado",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Post eliminado exitosamente",
      post,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

module.exports = posts;
