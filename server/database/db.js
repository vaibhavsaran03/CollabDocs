import mongoose from "mongoose";

const Connection = async () => {
  const URL =
    "mongodb+srv://vaibhavsaran01:11223344@cluster0.x3mf0nb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
