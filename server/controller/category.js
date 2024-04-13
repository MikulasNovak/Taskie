const express = require("express");
const router = express.Router();

const getAbl = require("../abl/category/getAbl");
const listAbl = require("../abl/category/listAbl");
const createAbl = require("../abl/category/createAbl");
const updateAbl = require("../abl/category/updateAbl");
const deleteAbl = require("../abl/category/deleteAbl");

router.get("/get", (req, res) => {
  getAbl(req, res);
});

router.get("/list", (req, res) => {
  listAbl(req, res);
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
