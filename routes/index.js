var express = require("express");
var router = express.Router();
const Country = require("./models/countryModel");
const State = require("./models/stateModel");
const City = require("./models/cityModel");
const mongoose = require("mongoose");

/* GET home page. */
router.get("/", async function (req, res) {
  const data = await Country.find().exec();
  res.status(200).json({ status: true, data: data });
});

router.get("/state/:id", async function (req, res) {
  let ObjectId = mongoose.Types.ObjectId;
  const data = await State.find({
    countryid: new ObjectId(req.params.id),
  }).exec();
  res.status(200).json({ status: true, data: data });
});

router.get("/city/:id", async function (req, res) {
  let ObjectId = mongoose.Types.ObjectId;
  const data = await City.find({
    stateid: new ObjectId(req.params.id),
  }).exec();
  res.status(200).json({ status: true, data: data });
});

module.exports = router;
