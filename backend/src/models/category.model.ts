import { Schema, model, Model, models } from "mongoose";
import { Category } from "../types";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { collection: "category" }
);
export const CategoryModel: Model<Category> =
  models.category || model<Category>("category", categorySchema);
