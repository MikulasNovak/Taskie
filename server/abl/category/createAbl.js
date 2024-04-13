const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    user_id: { type: "string" },
  },
  required: ["title", "user_id"],
  additionalProperties: false,
};

async function createAbl(req, res) {
  try {
    let category = req.body;

    // validate input

    const valid = ajv.validate(schema, category);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    category = categoryDao.create(category);
    res.json(category);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = createAbl;
