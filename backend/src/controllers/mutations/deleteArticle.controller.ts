import { RequestHandler } from "express";
import { ArticleModel } from "../../models";
import jwt from "jsonwebtoken";
import { secretKey } from "../../const_params";
import { Payload } from "../../types";

export const deleteArticle: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "Unauthorized: Token is missing" });
    return;
  }

  try {
    const { role } = jwt.verify(authorization, secretKey) as Payload;

    if (role !== "admin") {
      res
        .status(403)
        .json({ message: "Forbidden: Only admins can delete articles" });
      return;
    }

    const article = await ArticleModel.findByIdAndDelete(id);

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    res.json({ message: "Article deleted successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to delete article" });
    return;
  }
};
