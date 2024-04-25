import PostModel from "../models/post.js";

//Get all posts
export const getAllPosts = async (req, res) => {
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
      message: "Internal server error",
    });
  }
};

//Get popular posts
export const getPopularPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author")
      .sort({ likeCount: -1 })
      .limit(4)
      .exec();

    res.status(200).send({
      message: "Popular posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error("Error in /posts/popular:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

//Get user post by popularity
export const getPopularUserPosts = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await PostModel.find({ author: id })
      .populate("author")
      .sort({ likeCount: -1 })
      .limit(3)
      .exec();

    res.status(200).send({
      message: "Popular user posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error("Error in /posts/popular:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

//Create a post
export const createPost = async (req, res) => {
  const newPost = new PostModel({
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const post = await newPost.save();
    res.status(201).send({
      statusCode: 201,
      message: "Post created successfully",
      post,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

//Get a post by ID
export const getPostByID = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id).populate("author");

    if (!post) {
      return res.status(404).send({
        statusCode: 404,
        message: "No posts found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Post fetched successfully",
      post,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

//Get a post by user ID
export const getPostByUserID = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await PostModel.find({ author: id }).populate("author");

    if (!posts) {
      return res.status(404).send({
        statusCode: 404,
        message: "No posts found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

//Update a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const post = await PostModel.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!post) {
      return res.status(404).send({
        statusCode: 404,
        message: "No posts found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Post updated successfully",
      post,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

//Delete a post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).send({
        statusCode: 404,
        message: "No posts found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Post deleted successfully",
      post,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};
