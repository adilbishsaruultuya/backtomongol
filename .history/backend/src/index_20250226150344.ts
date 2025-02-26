import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";

// 環境変数を読み込む
dotenv.config();

// MongoDB に接続
connectDB();

// Express アプリを作成
const app = express();
const PORT = process.env.PORT || 5000;

// ミドルウェア
app.use(cors());
app.use(express.json()); // JSON を解析

// ルートエンドポイント
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ユーザー登録のエンドポイント（例）
app.post("/api/users", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) throw new Error("Name is required");

    // ここで MongoDB にデータを保存（仮の処理）
    res.status(201).json({ message: "User created", name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
