import mongoose from "mongoose";

// Connects the backend to the local MongoDB database using Mongoose.
export async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wordle");

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
