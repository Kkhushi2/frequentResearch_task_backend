const mongoose = require("mongoose");

const statesSchema = mongoose.Schema(
  {
    countryid:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    statename: {
      type: String,
      required: true,
      unique: true,
      
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("states", statesSchema);
