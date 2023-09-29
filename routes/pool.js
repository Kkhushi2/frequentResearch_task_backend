const mongoose = require("mongoose");
const Country = require("./models/countryModel");
const States = require("./models/stateModel");
const City = require("./models/cityModel");
var pool = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(`mongodb://localhost:27017/form`);
  mongoose.connection
    .once("open", async () => {
      try {
        const country = [
          { countryname: "India" },
          { countryname: "United Kingdom" },
          { countryname: "USA" },
        ];
        const data = await Country.insertMany(country);

        let states = [
          { statename: "Madhya Pradesh", countryid: "India" },
          { statename: "Uttar Pradesh", countryid: "India" },
          { statename: "England", countryid: "United Kingdom" },
          { statename: "Scotland", countryid: "United Kingdom" },
          { statename: "California", countryid: "USA" },
          { statename: "Alaska", countryid: "USA" },
        ];
        states = states.map((item) => ({
          ...item,
          countryid: data.filter((itm) => itm.countryname == item.countryid)[0]
            ._id,
        }));
        const stateData = await States.insertMany(states);

        let city = [
          { cityname: "Gwalior", stateid: "Madhya Pradesh" },
          { cityname: "Bhopal", stateid: "Madhya Pradesh" },
          { cityname: "Agra", stateid: "Uttar Pradesh" },
          { cityname: "Noida", stateid: "Uttar Pradesh" },
          { cityname: "Nottingham", stateid: "England" },
          { cityname: "Liverpool", stateid: "England" },
          { cityname: "Perth", stateid: "Scotland" },
          { cityname: "Edinburgh", stateid: "Scotland" },
          { cityname: "Los Angeles", stateid: "California" },
          { cityname: "San Francisco", stateid: "California" },
          { cityname: "Anchorage", stateid: "Alaska" },
          { cityname: "Juneau", stateid: "Alaska" },
        ];
        city = city.map((item) => ({
          ...item,
          stateid: stateData.filter((itm) => itm.statename == item.stateid)[0]
            ._id,
        }));
        const cityData = await City.insertMany(city);
      } catch (error) {}

      console.log("MongoDb running");
    })
    .on("error", (err) => console.log(err));
};
module.exports = pool;
