const mongoose = require("mongoose");
const { mongoDBConnectionString } = require("./config");

async function connectMongo() {
  return await mongoose.connect(mongoDBConnectionString);
}

module.exports = { connectMongo };
