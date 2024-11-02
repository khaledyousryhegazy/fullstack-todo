const mongoose = require("mongoose");
require("dotenv").config();

const connectionOptions = {
  dbName: `fullstack-todo`,
  useNewParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {});

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("Error during connection process", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
