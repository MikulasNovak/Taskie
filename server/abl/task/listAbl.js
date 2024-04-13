const taskDao = require("../../dao/task-dao.js");

async function listAbl(req, res) {
  try {
    const taskList = taskDao.list();
    res.json(taskList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = listAbl;
