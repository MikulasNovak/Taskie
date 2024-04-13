const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    surname: { type: "string" },
    username: { type: "string" },
    password: { type: "string" },
    email: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let user = req.body;

    // validate input
    const valid = ajv.validate(schema, user);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    if (userDao.checkUserExistence(user)) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `User with email ${user.email} or username ${user.username} already exists`,
      });
      return;
    }

    const updatedUser = userDao.update(user);

    if (!updatedUser) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${user.id} not found`,
      });
      return;
    }

    res.json(updatedUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
