import { RequestHandler } from "express";
import { ArticleModel } from "../../models";
import jwt from "jsonwebtoken";
import { secretKey } from "../../const_params";
import { Payload } from "../../types";

export const editArticle: RequestHandler = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { title, content, coverPhoto, category, status, publishedAt } =
    req.body;

  if (!authorization) {
    res.status(401).json({
      message: "Invalid credentials: AUTHORIZATION NOT FOUND",
    });
    return;
  }
  if (!title?.mn || !content?.mn || !category) {
    res.status(400).json({ message: "Missing required fields" });
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
      res
        .status(403)
        .json({ message: "Forbidden: You can only edit your own articles" });
      return;
    }

    article.title.mn = title.mn || article.title.mn;
    article.title.en = title.en || article.title.en;
    article.content.mn = content.mn || article.content.mn;
    article.content.en = content.en || article.content.en;
    article.coverPhoto = coverPhoto || article.coverPhoto;
    article.category = category || article.category;
    article.status = status || article.status;
    article.publishedAt = publishedAt || article.publishedAt;
    article.updatedAt = new Date();

    const updatedArticle = await article.save();

    res.json({
      message: "Article updated successfully",
      article: updatedArticle,
    });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to update article" });
    return;
  }
};
