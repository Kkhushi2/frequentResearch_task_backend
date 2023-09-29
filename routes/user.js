var express = require("express");
var router = express.Router();
var User = require("./models/userModel");
const Joi = require("joi");

/* GET home page. */
router.post("/", function (req, res) {
  const schema = Joi.object({
    firstname: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .required(),
    lastname: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .required(),
    email: Joi.string().email().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.number().integer().min(14).required(),
  });

  const { dob, ...data } = req.body;
  const { error, value } = schema.validate(data);

  if (error) {
    res.status(500).json({ message: error.details, status: false });
  } else {
    const data = new User({ ...req.body });
    data
      .save()
      .then((data) => {
        res.status(200).json({ status: true, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ status: false, data: {} });
      });
  }
});

router.get("/", function (req, res, next) {
  User.aggregate([
    {
      $lookup: {
        from: "countries", // Target collection name
        localField: "country",
        foreignField: "_id",
        as: "country",
      },
    },
    {
      $lookup: {
        from: "states", // Target collection name
        localField: "state",
        foreignField: "_id",
        as: "state",
      },
    },
    {
      $lookup: {
        from: "cities", // Target collection name
        localField: "city",
        foreignField: "_id",
        as: "city",
      },
    },
    {
      $unwind: "$country",
    },
    {
      $unwind: "$state",
    },
    {
      $unwind: "$city",
    },
    {
      $project: {
        country: "$country.countryname",
        state: "$state.statename",
        city: "$city.cityname",
        firstname: 1,
        lastname: 1,
        email: 1,
        gender: 1,
        dob: 1,
        age: 1,
      },
    },
  ])
    .then((data) => {
      res.status(200).json({ status: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ status: false, data: {} });
    });
});

module.exports = router;
