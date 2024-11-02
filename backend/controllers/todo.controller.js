const Todo = require("../models/todo.model");

// get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Todo.find({ userId: req.user._id });

    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to get tasks" });
  }
};

// create task
const createTask = async (req, res) => {
  try {
    const taskData = req.body;

    if (!taskData) {
      return res.json({ error: "Please enter valid data" });
    }

    taskData.userId = req.user._id;

    const newTask = new Todo(taskData);
    await newTask.save();

    res.status(201).json({ success: true, newTask });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error during task creation: " + err.message,
    });
  }
};

// update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    if (!id) {
      res.status(400).json({ msg: "please check the id " });
    }

    if (!newData) {
      res.status(400).json({ msg: "please check the data you entered " });
    }

    const updatedTask = await Todo.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(201).json({
      success: true,
      message: "task modified successfully",
      data: updatedTask,
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// update task status (completed ?)
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ msg: "please check the id " });
    }

    const task = await Todo.findById(id);

    if (!task) {
      res.status(400).json({ msg: "task not found please check !" });
    }

    await Todo.findByIdAndUpdate(
      id,
      { completed: !task.completed },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "task modified successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = await req.params;

    if (!id) {
      res.status(400).json({ msg: "please check the id" });
    }

    const deletedTask = await Todo.findByIdAndDelete(id);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, msg: "task deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
