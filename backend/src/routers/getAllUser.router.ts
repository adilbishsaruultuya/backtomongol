import { Router } from "express";
import { getAllUser } from "../controllers";

const getAllUserRouter = Router();

getAllUserRouter.get("/getAllUser", getAllUser);

export default getAllUserRouter;
