import { RequestHandler } from "express";
import { UserModel } from "../models";

export const getUser: RequestHandler = async (_, res) => {
  const users = await UserModel.find();
  res.json(users);
};
