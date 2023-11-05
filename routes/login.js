const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

login.post("/login", async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({
      message: "User not found",
      statusCode: 404,
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(401).send({
      message: "Invalid password",
      statusCode: 401,
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthday: user.birthday,
      avatar: user.avatar,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.header("Authorization", token).status(200).send({
    statusCode: 200,
    message: "Login successfully",
    token,
  });
});

module.exports = login;
