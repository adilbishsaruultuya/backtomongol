import { Router } from "express";
import { getAllTests } from "../controllers/getTest.controller";

const testRouter = Router();

testRouter.get("/test", getAllTests);

export default testRouter;
