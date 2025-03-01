import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {});
    console.log(`Connected to MongoDB Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.log("Database connection failed");
  }
};
