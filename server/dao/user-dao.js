const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const userFolderPath = path.join(__dirname, "../storage", "user");

function get(user_id) {
  try {
    const userFile = path.join(userFolderPath, `${user_id}.json`); //user FILE

    const userData = fs.readFileSync(userFile, "utf8");
    return JSON.parse(userData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadUser", message: error.message };
  }
}

// Function to hash a password
async function hashPassword(password) {
  try {
    const saltRounds = 10; // Number of salt rounds (higher is more secure but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

async function create(user) {
  try {
    user.id = crypto.randomBytes(16).toString("hex"); // ID GENERATION
    user.password = await hashPassword(user.password);
    const filePath = path.join(userFolderPath, `${user.id}.json`);
    const fileData = JSON.stringify(user);
    fs.writeFileSync(filePath, fileData, "utf8");
  } catch (error) {
    throw { code: "failedToCreateUser", message: error.message };
  }
}

async function update(user) {
  try {
    const userCurrent = get(user.id);
    if (!userCurrent) {
      return null;
    }
    user.password = await hashPassword(user.password);
    const userNew = { ...userCurrent, ...user }; //user MERGING
    const filePath = path.join(userFolderPath, `${user.id}.json`);
    const fileData = JSON.stringify(userNew);
    fs.writeFileSync(filePath, fileData, "utf8");
    return userNew;
  } catch (error) {
    throw { code: "failedToUpdateUser", message: error.message };
  }
}


function remove(user_id) {
  //WORKING - potřeba upravit aby se smazalo vše co udělal např: kategorie/úkoly
  try {
    const filePath = path.join(userFolderPath, `${user_id}.json`);
    fs.unlinkSync(filePath);

    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveUser", message: error.message };
  }
}

/*
async function comparePasswords(plainPassword, hashedPassword) {
  try {
    // Compare the provided password with the hashed password
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
}

*/

function list() {
  try {
    const files = fs.readdirSync(userFolderPath);
    const userList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(userFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return userList;
  } catch (error) {
    throw { code: "failedToListUsers", message: error.message };
  }
}

function checkUserExistence(user) {
  const userList = list();
  const userExists = userList.some(
    (u) =>
      u.email === user.email ||
      (u.username === user.username && u.id !== user.id)
  );
  return userExists;
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  checkUserExistence,
};
