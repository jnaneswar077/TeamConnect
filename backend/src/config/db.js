import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not set");
    }
    
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected successfully:", conn.connection.host);
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Don't exit process in serverless environment, just throw the error
    throw error;
  }
};
