const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");

ajv.addFormat("date-time", { validate: validateDateTime });

const taskDao = require("../../dao/task-dao.js");
const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    category_id: { type: "string" },
    title: { type: "string" },
    priority: { type: "string" },
    date: { type: "string", format: "date-time" },
    description: { type: "string" },
    completed: { type: "boolean" },
  },
  required: [
    "category_id",
    "date",
    "title",
    "description",
    "priority",
    "completed",
  ],
  additionalProperties: false,
};

async function createAbl(req, res) {
  try {
    let task = req.body;

    const valid = ajv.validate(schema, task);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    if (!categoryDao.get(task.category_id)) {
      res.status(400).json({
        code: "categoryNotFound",
        message: "Category does not exist",
      });
      return;
    }

    task = taskDao.create(task);
    res.json(task);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = createAbl;
