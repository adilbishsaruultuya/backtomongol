import { Schema, model, Model, models } from "mongoose";
import { User } from "../types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Guest",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Article",
        required: false,
      },
    ],
  },
  { collection: "user" }
);

export const UserModel: Model<User> =
  models.user || model<User>("user", userSchema);
