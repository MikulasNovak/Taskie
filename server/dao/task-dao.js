const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const taskFolderPath = path.join(__dirname, "../storage", "task");

function get(task_id) {
  try {
    const taskFile = path.join(taskFolderPath, `${task_id}.json`); //TASK FILE
    const taskData = fs.readFileSync(taskFile, "utf8");
    return JSON.parse(taskData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadTask", message: error.message };
  }
}

function create(task) {
  try {
    task.id = crypto.randomBytes(16).toString("hex"); // ID GENERATION
    const filePath = path.join(taskFolderPath, `${task.id}.json`);
    const fileData = JSON.stringify(task);
    fs.writeFileSync(filePath, fileData, "utf8");
    return task;
  } catch (error) {
    throw { code: "failedToCreateTask", message: error.message };
  }
}

function update(task) {
  try {
    const taskCurrent = get(task.id);
    if (!taskCurrent) {
      return null;
    }
    const taskNew = { ...taskCurrent, ...task }; //TASK MERGING
    const filePath = path.join(taskFolderPath, `${task.id}.json`);
    const fileData = JSON.stringify(taskNew);
    fs.writeFileSync(filePath, fileData, "utf8");
    return taskNew;
  } catch (error) {
    throw { code: "failedToUpdateTask", message: error.message };
  }
}

function remove(task_id) {
  try {
    const filePath = path.join(taskFolderPath, `${task_id}.json`);
    fs.unlinkSync(filePath);

    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveTask", message: error.message };
  }
}

function removeTaskByCategory(category_id) {
  const files = fs.readdirSync(taskFolderPath);

  for (const file of files) {
    const filePath = path.join(taskFolderPath, file);
    const fileData = fs.readFileSync(filePath, "utf8");
    const task = JSON.parse(fileData);

    if (task.category_id === category_id) {
      fs.unlinkSync(filePath);
    }
  }
}

function taskCompleted(task_id) {
  try {
    const task = get(task_id);
    if (!task) {
      return null; // Task not found
    }
    task.completed = true; // Mark the task as completed
    return update(task); // Update the task in the database
  } catch (error) {
    throw { code: "failedToCompleteTask", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(taskFolderPath);
    const taskList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(taskFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return taskList;
  } catch (error) {
    throw { code: "failedToListTasks", message: error.message };
  }
}

function listCategoryFilter(category_id) {
  try {
    const files = fs.readdirSync(taskFolderPath);
    const filteredTasks = [];

    for (const file of files) {
      const fileData = fs.readFileSync(path.join(taskFolderPath, file), "utf8");
      const task = JSON.parse(fileData);

      // Filter tasks based on the provided category ID
      if (task.categoryId === category_id) {
        filteredTasks.push(task);
      }
    }

    return filteredTasks;
  } catch (error) {
    throw { code: "failedToListTasks", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  listCategoryFilter,
  removeTaskByCategory,
  taskCompleted,
};
