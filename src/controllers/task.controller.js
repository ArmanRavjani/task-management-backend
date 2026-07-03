import taskModel from "../models/task.model.js";

async function addTasks(req, res) {
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Some Details Missing",
    });
  }

  const userId = req.user._id;
  const task = await taskModel.create({
    title: title,
    desc: description,
    status: status,
    user: userId,
  });

  res.status(201).json({
    message: "Task Created Successfully",
    task: task,
  });
}

async function getAllTasks(req, res) {
  const tasks = await taskModel.find({
    user: req.user.id,
  });
  res.status(200).json({
    message: "Fetched Successfully",
    tasks: tasks,
  });
}

async function updateTask(req, res) {
  try {
    const { status } = req.body;

    const updateTask = await taskModel.findByIdAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      { status },
      { returnDocument: "after" },
    );

    res.status(200).json({
      message: "Status Updated Successfully",
      task: updateTask,
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteTask(req, res) {
  try {
    const deletedTask = await taskModel.findByIdAndDelete(
      { _id: req.params.id, user: req.user.id },
      {
        returnDocument: "after",
      },
    );
    res.status(200).json({
      message: "Task Deleted Successfully",
      task: deleteTask,
    });
  } catch (error) {
    console.log(error);
  }
}

export { addTasks, getAllTasks, updateTask, deleteTask };
