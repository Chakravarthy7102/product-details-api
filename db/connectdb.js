const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONG0_KEY;
const connectDB = async () => {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
  console.log(
    "connected to db--dev purposes only remove after the developement"
  );
};

module.exports = connectDB;
