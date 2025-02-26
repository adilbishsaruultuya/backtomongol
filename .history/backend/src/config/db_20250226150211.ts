import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      // ↓ TypeScript の場合、`as string` で型を指定
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // エラー時にプロセス終了
  }
};

export default connectDB;
