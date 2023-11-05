const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const logger = require("./middlewares/logger");

const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");
const postsRoute = require("./routes/posts");

const PORT = 5050;
const app = express();
app.use(cors());

app.use(express.json());
app.use(logger);

app.use("/", usersRoute);
app.use("/", loginRoute);
app.use("/", postsRoute);

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
