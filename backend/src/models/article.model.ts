import { Schema, model, Model, models } from "mongoose";
import { Article, ArticleStatus } from "../types";

const articleSchema = new Schema(
  {
    title: {
      mn: { type: String, required: true },
      en: { type: String, required: false },
    },
    content: {
      mn: { type: String, required: true },
      en: { type: String, required: false },
    },
    coverPhoto: {
      type: String,
      required: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ArticleStatus),
      default: ArticleStatus.Draft,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    publishedAt: {
      type: Date,
      required: false,
    },
  },
  { collection: "article", timestamps: true }
);

export const ArticleModel: Model<Article> =
  models.article || model<Article>("article", articleSchema);
