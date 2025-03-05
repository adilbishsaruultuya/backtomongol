import { RequestHandler } from "express";
import { UserModel } from "../models";
import { secretKey } from "../const_params";
import { Payload } from "../types";
import jwt from "jsonwebtoken";

export const getUser: RequestHandler = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      message: "No authorization found",
    });
    return;
  }
  const { id } = jwt.verify(authorization, secretKey) as Payload;

  const user = await UserModel.findOne({ _id: id });

  if (user) {
    try {
      res.json(user);
      return;
    } catch (error) {
      res
        .status(401)
        .json({ error: error, message: "could not send user information" });
    }
  }
  res.json("user not found");
  return;
};
