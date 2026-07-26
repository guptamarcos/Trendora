const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError.js");

async function connectDb() {
  try {
    if (!process.env.ATLAS_DB_URL) {
      throw new ExpressError(500, "Database url not exist !!");
    }
    await mongoose.connect(process.env.ATLAS_DB_URL);
  } catch (err) {
    throw new ExpressError(err.statue, err.message);
  }
}

module.exports = connectDb;
