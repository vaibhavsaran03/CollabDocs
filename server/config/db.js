import mongoose from "mongoose";
import config from "config";
import dotenv from "dotenv";

dotenv.config();

// const db = config.get("mongoURI");

const Connection = async () => {
  const URL = process.env.MONGODB_URI || db;
  try {
    console.log("Connecting to the database");
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }
};

export default Connection;
