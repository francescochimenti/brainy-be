import express from "express";
import {
  getAllUsers,
  cloudUpload,
  uploadAvatar,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
const users = express.Router();

users.post("/users/upload", cloudUpload.single("cover"), uploadAvatar);
users.get("/users", getAllUsers);
users.get("/users/:id", getSingleUser);
users.post("/users/create", createUser);
users.patch("/users/update/:id", updateUser);
users.delete("/users/delete/:id", deleteUser);

export default users;
