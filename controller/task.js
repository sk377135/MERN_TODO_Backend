import ErrorHeandler from "../middlewares/error.js";
import { Task } from "../model/task.js";
////? Adding new task;;;;
export const addTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({ title, description, user: req.user });

    res.status(201).json({ success: true, message: "Task has been created" });
  } catch (error) {
    next(error);
  }
};
////? View all the task;;;;
export const viewTask = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const myTask = await Task.find({ user: userId });

    res.status(200).json({ success: true, myTask });
  } catch (error) {
    next(error);
  }
};
////? Update all the task;;;;
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHeandler("Invalid Id", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();
    res
      .status(200)
      .json({ success: true, message: "task Upadated successfully" });
  } catch (error) {
    next(error);
  }
};
////? Delete selected task;;;;
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHeandler("Task not found", 404));
    await task.deleteOne();

    res.status(200).json({ success: true, message: "deleted successfully" });
  } catch (error) {
    next(error);
  }
};
