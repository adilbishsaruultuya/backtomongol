import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models";
import { secretKey } from "../const_params";
import { Payload } from "../types";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      message: "Invalid credentials: AUTHORIZATION NOT FOUND",
    });
    return;
  }

  try {
    const { id } = jwt.verify(authorization, secretKey) as Payload;

    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      res.status(401).json({
        message: "Invalid credentials: USER NOT FOUND  ",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid credentials in middleware",
    });
    return;
  }
};
