const mongoose = require("mongoose");
const User = require("../models/userModel");

const DB_URI = "";

const connectDatabase = async () => {
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(() => {
      console.log("Connection unsuccessfully");
    });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
};

module.exports = connectDatabase;
