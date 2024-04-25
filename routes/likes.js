import express from "express";
import { iDontLikeThisAnymore, iLikeThis } from "../controllers/likes.js";
const posts = express.Router();

posts.post("/posts/:postId/like/:userId", iLikeThis);
posts.delete("/posts/:postId/delete-like/:userId", iDontLikeThisAnymore);

export default posts;
