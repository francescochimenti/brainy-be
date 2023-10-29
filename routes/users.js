const express = require("express");
const users = express.Router();
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

// Get all users
users.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send({
      statusCode: 200,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// Get a single user
users.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);
    res.status(200).send({
      statusCode: 200,
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// Create a user
users.post("/users/create", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    birthday: req.body.birthday,
    avatar: req.body.avatar,
  });

  try {
    const user = await newUser.save();
    res.status(201).send({
      statusCode: 201,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// Update a user
users.patch("/users/update/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({
      statusCode: 200,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// Delete a user
users.delete("/users/delete/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      statusCode: 200,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = users;
