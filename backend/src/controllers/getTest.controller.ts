import { Request, Response } from "express";
import { TestModel } from "../models";

export const getAllTests = async (req: Request, res: Response) => {
  try {
    const tests = await TestModel.find();
    res.json(tests);
  } catch (error) {
    console.error("❌ Error fetching tests:", error);
    res.status(500).json({ error: "eee to fetch test data" });
  }
};
