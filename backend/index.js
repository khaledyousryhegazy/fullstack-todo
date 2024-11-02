// load env variables
require("dotenv").config();

// import dependencies
const express = require("express");
const cors = require("cors");
const connectDB = require("./connection/connectDB");
const todoRouter = require("./routes/todo.route");
const userRouter = require("./routes/user.route");

// initialize express app
const app = express();

// middleware setup
app.use(express.json());
app.use(cors());

// connection with mongodb database
connectDB();

app.get("/", (req, res) => {
  res.send("API is running. Available routes: /tasks");
});

app.use("/tasks", todoRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
