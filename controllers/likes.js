import PostModel from "../models/post.js";
import LikeModel from "../models/like.js";

//Post a like
export const iLikeThis = async (req, res) => {
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

    await PostModel.findByIdAndUpdate(postId, {
      $inc: { likeCount: 1 },
      $addToSet: { likes: userId },
    });

    res.status(201).send({ message: "Like added successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

//Delete a like
export const iDontLikeThisAnymore = async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const like = await LikeModel.findOneAndDelete({
      post: postId,
      user: userId,
    });
    if (like) {
      await PostModel.findByIdAndUpdate(postId, {
        $inc: { likeCount: -1 },
        $pull: { likes: userId },
      });
    }

    res.status(200).send({ message: "Like removed successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
