import { Request, Response } from "express";
import { ArticleModel } from "../models";
import jwt from "jsonwebtoken";
import { secretKey } from "../const_params";
import { Payload, ArticleStatus } from "../types";

const buildQuery = ({
  status,
  author,
  startDate,
  endDate,
}: {
  status?: string;
  author?: string;
  startDate?: Date;
  endDate?: Date;
}) => {
  const query: any = {};

  if (status) {
    query.status = { $regex: status, $options: "i" };
  }

  if (author) {
    query.author = author;
  }

  if (startDate && endDate) {
    query.createdAt = { $gte: startDate, $lte: endDate };
  }

  return query;
};

export const getArticlesByUserRole = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      message: "Invalid credentials: AUTHORIZATION NOT FOUND",
    });
    return;
  }

  try {
    const { id, role } = jwt.verify(authorization, secretKey) as Payload;
    const status = req.query.status as ArticleStatus | undefined;
    const startDate = req.query.startDate
      ? new Date(req.query.startDate as string)
      : undefined;
    const endDate = req.query.endDate
      ? new Date(req.query.endDate as string)
      : undefined;

    const query =
      role === "user"
        ? buildQuery({
            status,
            author: id,
            startDate,
            endDate,
          })
        : buildQuery({
            status,
            startDate,
            endDate,
          });
    console.log(query);
    const articles = await ArticleModel.find(query).exec();
    res.json(articles);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
    return;
  }
};
