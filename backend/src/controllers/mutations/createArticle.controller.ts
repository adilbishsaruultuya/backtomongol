import { Request, Response } from "express";
import { ArticleModel } from "../../models";
import jwt from "jsonwebtoken";
import { secretKey } from "../../const_params";
import { Payload, ArticleStatus } from "../../types";

export const createArticle = async (req: Request, res: Response) => {
  console.log("create kita");
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      message: "Invalid credentials: AUTHORIZATION NOT FOUND",
    });
    return;
  }

  try {
    // 🔹 トークン検証
    const { id } = jwt.verify(authorization, secretKey) as Payload;

    // 🔹 リクエストボディからデータを取得
    const { title, content, coverPhoto, status, category } = req.body;

    // 🔹 必須項目チェック
    // if (!title || !content || !status) {
    //   res.status(400).json({ message: "Missing required fields" });
    //   return;
    // }

    if (!title?.mn || !content?.mn || !category) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // 🔹 新しい記事の作成
    const newArticle = new ArticleModel({
      title,
      content,
      coverPhoto,
      category,
      author: id,
      status: status || ArticleStatus.Draft,
      publishedAt: status === ArticleStatus.Published ? new Date() : undefined,
    });

    // 🔹 データベースに保存
    await newArticle.save();

    res
      .status(201)
      .json({ message: "Article created successfully", article: newArticle });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: "Failed to create article" });
  }
};
