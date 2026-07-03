import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title must be required"],
    },
    desc: {
      type: String,
      required: [true, "description must be required"],
    },
    status: {
      type: String,
      enum: ["todo", "pending", "completed"],
      default: "todo",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);

const taskModel = mongoose.model("task", taskSchema);
export default taskModel;
