const Ajv = require("ajv");
const ajv = new Ajv();
const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function getAbl(req, res) {
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

    const category = categoryDao.get(reqParam.id);

    if (!category) {
      res.status(404).json({
        code: "categoryNotFound",
        message: `category ${reqParam.id} not found`,
      });
      return;
    }

    res.json(category);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = getAbl;
