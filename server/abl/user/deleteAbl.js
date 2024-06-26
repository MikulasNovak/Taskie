const Ajv = require("ajv");
const ajv = new Ajv();
const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function deleteAbl(req, res) {
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

    if (!userDao.get(reqParam.id)) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "User does not exist",
      });
      return;
    }

    userDao.remove(reqParam.id);

    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = deleteAbl;
