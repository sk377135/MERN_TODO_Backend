import express from "express";
import {
  addTask,
  deleteTask,
  updateTask,
  viewTask,
} from "../controller/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const Task_router = express.Router();

Task_router.post("/new", isAuthenticated, addTask);
Task_router.get("/my", isAuthenticated, viewTask);
Task_router.put("/:id", isAuthenticated, updateTask);
Task_router.delete("/:id", isAuthenticated, deleteTask);
export default Task_router;
