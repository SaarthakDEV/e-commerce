import mongoose from "mongoose";

const MONGO_URI = process.env.DB_CONNECTION_URL! as string;

if (!MONGO_URI)
  throw new Error("Missing connection url in environment variables");

let isConnected = false;

export const connectToMongo = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }
  try {
    const db = await mongoose.connect(MONGO_URI, {
      bufferCommands: false, // Important for serverless
    });
    isConnected = true;
    console.log("MongoDB connected:", db.connection.name);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw new Error("Failed to connect to MongoDB");
  }
};
