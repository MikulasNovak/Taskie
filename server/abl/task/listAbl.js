const taskDao = require("../../dao/task-dao.js");

async function listAbl(req, res) {
  try {
    const filters = {
      category_id: req.query.category_id,
    };

    let taskList = await taskDao.list();

    if (filters.category_id) {
      taskList = taskList.filter(
        (item) => item.category_id === filters.category_id
      );
    }
    res.json(taskList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = listAbl;
