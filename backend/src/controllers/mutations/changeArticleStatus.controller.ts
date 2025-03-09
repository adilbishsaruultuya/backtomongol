import { RequestHandler } from "express";
import { ArticleModel } from "../../models";
import jwt from "jsonwebtoken";
import { secretKey } from "../../const_params";
import { Payload } from "../../types";

export const changeArticleStatus: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "Unauthorized: Token is missing" });
    return;
  }
  if (!status) {
    res.status(400).json({ message: "Status is required" });
    return;
  }

  try {
    const { id: userId, role } = jwt.verify(
      authorization,
      secretKey
    ) as Payload;

    const article = await ArticleModel.findById(id);

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    if (role === "user" && article.author.toString() !== userId) {
      res.status(403).json({
        message:
          "Forbidden: You can only change the status of your own articles",
      });
      return;
    }

    article.status = status;
    article.updatedAt = new Date();

    const updatedArticle = await article.save();

    res.json({
      message: "Article status updated successfully",
      article: updatedArticle,
    });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to update article status" });
    return;
  }
};
