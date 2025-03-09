import { Request, Response } from "express";
import { CategoryModel } from "../models";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch test data" });
  }
};
