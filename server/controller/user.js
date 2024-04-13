const express = require("express");
const router = express.Router();

const getAbl = require("../abl/user/getAbl");
const listAbl = require("../abl/user/listAbl");
const createAbl = require("../abl/user/createAbl");
const updateAbl = require("../abl/user/updateAbl");
const deleteAbl = require("../abl/user/deleteAbl");

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
