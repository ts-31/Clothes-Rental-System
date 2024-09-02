const mongoose = require("mongoose");

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to mongodb successfully.");
  } catch (error) {
    console.log("Error connecting to mongodb: ", error);
  }
};

module.exports = connectToMongoDb;
