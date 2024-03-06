import errorHeandler from "../middlewares/error.js";
import { Task } from "../model/task.js";
////? Adding new task;;;;
export const addTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({ title, description, user: req.user });
    res.status(201).json({ sucess: true, message: "Task has been created" });
  } catch (error) {
    next(error);
  }
};
////? View all the task;;;;
export const viewTask = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const myTask = await Task.find({ user: userId });
    if (!myTask)
      return res.status(404).json({ sucess: false, message: "Task not found" });

    res.status(200).json({ sucess: true, myTask });
  } catch (error) {
    next(error);
  }
};
////? Update all the task;;;;
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new errorHeandler("Invalid Id", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();
    res
      .status(200)
      .json({ sucess: true, message: "task Upadated sucessfully" });
  } catch (error) {
    next(error);
  }
};
////? Delete selected task;;;;
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new errorHeandler("Invaid Id", 404));
    await task.deleteOne();
    res.status(200).json({ sucess: true, message: "deleted sucessfully" });
  } catch (error) {
    next(error);
  }
};
