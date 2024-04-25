import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import logger from "./middlewares/logger.js";
import loginRoute from "./routes/login.js";
import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import likesRoute from "./routes/likes.js";

const PORT = 5050;
const app = express();
app.use(cors());

app.use(express.json());
app.use(logger);

app.use("/", usersRoute);
app.use("/", loginRoute);
app.use("/", postsRoute);
app.use("/", likesRoute);

// Connect to DB
mongoose.connect(process.env.SERVER_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Check for DB connection

// Log DB connection errors
db.on("error", console.error.bind(console, "connection error:"));
// Log DB connection success
db.once("open", () => {
  console.log("Database successfully connected");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
