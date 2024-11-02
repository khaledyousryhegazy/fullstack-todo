const router = require("express").Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/todo.controller");
const auth = require("../middlewares/auth");

router.get("/", auth, getAllTasks).post("/", auth, createTask);

router.put("/:id", updateTask).delete("/:id", deleteTask);

router.put("/:id/completed", updateTaskStatus);

module.exports = router;
