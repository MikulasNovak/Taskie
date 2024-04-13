const taskDao = require("../../dao/task-dao.js");
const categoryDao = require("../../dao/category-dao.js");
const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    category_id: { type: "string" },
  },
  required: ["category_id"],
  additionalProperties: false,
};

async function listCategoryFilterAbl(req, res) {
  try {
    const reqParam = req.query?.id ? req.query : req.body;

    const valid = ajv.validate(schema, reqParam);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    if (!categoryDao.get(reqParam.category_id)) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "category does not exist",
        validationError: ajv.errors,
      });
      return;
    }

    const taskList = taskDao.listCategoryFilter(reqParam.category_id);

    res.json(taskList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = listCategoryFilterAbl;
