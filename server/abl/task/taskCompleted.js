const Ajv = require("ajv");
const ajv = new Ajv();

const taskDao = require("../../dao/task-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function completeAbl(req, res) {
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

    const taskCompleted = taskDao.taskCompleted(reqParam.id);

    res.json(taskCompleted);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = completeAbl;
