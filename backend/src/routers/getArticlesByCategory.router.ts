import { Router } from "express";
import { getArticlesByCategory } from "../controllers";
const getArticlesByCategoryRouter = Router();

getArticlesByCategoryRouter.post(
  "/getArticlesByCategory",
  getArticlesByCategory
);

export default getArticlesByCategoryRouter;
