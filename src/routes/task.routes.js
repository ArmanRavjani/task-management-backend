import express from "express";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
import {
  addTasks,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
const router = express.Router();

router.post("/", authUserMiddleware, addTasks);
router.get("/", authUserMiddleware, getAllTasks);
router.patch("/update-task/:id", authUserMiddleware, updateTask);
router.delete("/delete-task/:id", authUserMiddleware, deleteTask);

export { router as taskRouter };
