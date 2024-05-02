const express = require("express");
const router = express.Router();

const getAbl = require("../abl/task/getAbl");
const listAbl = require("../abl/task/listAbl");
const listCategoryFilterAbl = require("../abl/task/listCategoryFilter");
const createAbl = require("../abl/task/createAbl");
const updateAbl = require("../abl/task/updateAbl");
const deleteAbl = require("../abl/task/deleteAbl");
const taskCompletedAbl = require("../abl/task/taskCompleted.js");

router.get("/get", (req, res) => {
  getAbl(req, res);
});

router.get("/list", (req, res) => {
  listAbl(req, res);
});

router.get("/list/category", (req, res) => {
  listCategoryFilterAbl(req, res);
});

router.post("/complete", (req, res) => {
  taskCompletedAbl(req, res);
});

router.post("/create", (req, res) => {
  createAbl(req, res);
});

router.post("/update", (req, res) => {
  updateAbl(req, res);
});

router.post("/delete", (req, res) => {
  deleteAbl(req, res);
});

module.exports = router;
