import { RequestHandler } from "express";
import { UserModel } from "../models";
import { secretKey } from "../const_params";
import { Payload } from "../types";
import jwt from "jsonwebtoken";

export const getAllUser: RequestHandler = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      message: "No authorization found in get all user controller",
    });
    return;
  }
  const { id } = jwt.verify(authorization, secretKey) as Payload;

  const user = await UserModel.findOne({ _id: id });

  if (!user) {
    res.status(401).json({
      message: "No user found in get all user controller",
    });
    return;
  }

  if (user.role != "admin") {
    res.status(401).json({
      message:
        "You are not admin and you can not access [get all user] controller",
    });
    return;
  }

  try {
    const allUser = await UserModel.find();
    res.json(allUser);
    return;
  } catch (error) {
    res
      .status(401)
      .json({ error: error, message: "could not send all user information" });
  }
  return;
};
