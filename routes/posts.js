import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPopularPosts,
  getPopularUserPosts,
  getPostByID,
  getPostByUserID,
  updatePost,
} from "../controllers/posts.js";
const posts = express.Router();

posts.get("/posts", getAllPosts);
posts.get("/posts/popular", getPopularPosts);
posts.get("/posts/user/:id/popular", getPopularUserPosts);
posts.post("/posts/create", createPost);
posts.get("/posts/:id", getPostByID);
posts.get("/posts/user/:id", getPostByUserID);
posts.patch("/posts/:id", updatePost);
posts.delete("/posts/:id", deletePost);

export default posts;
