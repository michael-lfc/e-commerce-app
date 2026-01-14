import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // no options needed
    console.log("✅ MongoDB connected to e-commerce-app-2");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
};
