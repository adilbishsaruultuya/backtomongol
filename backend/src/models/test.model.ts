import { Schema, model } from "mongoose";

const testSchema = new Schema(
  {
    test: {
      type: String,
      required: true,
    },
  },
  { collection: "test" }
);

export const TestModel = model("Test", testSchema);
