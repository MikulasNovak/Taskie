const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const taskDao = require("./task-dao.js");

const categoryFolderPath = path.join(__dirname, "../storage", "category");

function get(category_id) {
  try {
    const categoryFile = path.join(categoryFolderPath, `${category_id}.json`); //category FILE
    const categoryData = fs.readFileSync(categoryFile, "utf8");
    return JSON.parse(categoryData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadcategory", message: error.message };
  }
}

function create(category) {
  try {
    category.id = crypto.randomBytes(16).toString("hex"); // ID GENERATION
    const filePath = path.join(categoryFolderPath, `${category.id}.json`);
    const fileData = JSON.stringify(category);
    return category;
    fs.writeFileSync(filePath, fileData, "utf8");
  } catch (error) {
    throw { code: "failedToCreatecategory", message: error.message };
  }
}

function update(category) {
  try {
    const categoryCurrent = get(category.id);
    if (!categoryCurrent) {
      return null;
    }
    const categoryNew = { ...categoryCurrent, ...category }; //category MERGING
    const filePath = path.join(categoryFolderPath, `${category.id}.json`);
    const fileData = JSON.stringify(categoryNew);
    fs.writeFileSync(filePath, fileData, "utf8");
    return categoryNew;
  } catch (error) {
    throw { code: "failedToUpdatecategory", message: error.message };
  }
}

function remove(category_id) {
  try {
    taskDao.removeTaskByCategory(category_id);

    const filePath = path.join(categoryFolderPath, `${category_id}.json`);
    fs.unlinkSync(filePath);

    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemovecategory", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(categoryFolderPath);
    const categoryList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(categoryFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return categoryList;
  } catch (error) {
    throw { code: "failedToListcategorys", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
