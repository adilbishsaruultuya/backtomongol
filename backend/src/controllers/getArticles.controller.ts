import { Request, Response } from "express";
import { ArticleModel } from "../models";

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await ArticleModel.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch test data" });
  }
};
