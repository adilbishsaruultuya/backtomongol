import { RequestHandler } from "express";
import { UserModel } from "../models";
import { secretKey } from "../const_params";
import jwt from "jsonwebtoken";

// SIGN UP
export const signUp: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await UserModel.findOne({ email: email });

  if (userExist) {
    res.status(401).json({
      message: "This email already registered",
    });
    return;
  }

  try {
    const user = await UserModel.create({
      name,
      email,
      password,
    });

    res.json({ message: "Account successfully created", user: user });
    return;
  } catch (error) {
    res.status(401).json({ error: error, message: "could not create user" });
    return;
  }
};

// SIGN IN
export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email, password: password });

  if (!user) {
    res.status(401).json({ message: "Email or Password does not match" });
    return;
  }

  const id = user._id;

  const token = jwt.sign(
    {
      id: id,
    },
    secretKey,
    { expiresIn: "1h" }
  );

  res.json({ token });
};
