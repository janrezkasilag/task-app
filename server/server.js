const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Task = require("./models/Task");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// ADD TASK API
app.post("/add-task", async (req, res) => {
  try {
    const { task } = req.body;

    const newTask = new Task({
      task,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend API is running");
});


// ADD TASK
app.post("/add-task", async (req, res) => {
  try {
    res.json({
      message: "Task Added"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});