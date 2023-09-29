const mongoose = require("mongoose");
const countrySchema = mongoose.Schema(
  {
    countryname: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("country", countrySchema);
