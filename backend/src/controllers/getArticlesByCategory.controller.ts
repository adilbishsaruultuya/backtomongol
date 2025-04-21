import { Request, Response } from "express";
import { ArticleModel } from "../models";

export const getArticlesByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.body;
  if (!categoryId) {
    res
      .status(401)
      .json({ message: "categoryId is missing in getArticlesByCategory" });
    return;
  }
  try {
    const articles = await ArticleModel.find({
      category: categoryId,
      status: "Published",
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to getArticlesByCategory" });
  }
};
