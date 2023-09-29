const mongoose = require("mongoose");

const citySchema = mongoose.Schema(
  {
    stateid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    cityname: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("city", citySchema);
