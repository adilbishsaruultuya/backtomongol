import { Router } from "express";
import { getArticles } from "../controllers";
const getArticlesRouter = Router();

getArticlesRouter.get("/getArticles", getArticles);

export default getArticlesRouter;
