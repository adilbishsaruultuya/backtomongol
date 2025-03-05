import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signIn", signIn).post("/signUp", signUp);

export default authRouter;
