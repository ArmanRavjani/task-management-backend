import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes.js";
import { taskRouter } from "./routes/task.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(
  cors({
    origin: "https://task-management-ar.vercel.app/",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
export default app;
