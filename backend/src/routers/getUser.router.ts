import { Router } from "express";
import { getUser } from "../controllers";

const getUserRouter = Router();

getUserRouter.get("/getUser", getUser);

export default getUserRouter;
