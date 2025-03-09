import { Router } from "express";
import { createArticle } from "../controllers/mutations/createArticle.controller";

const createArticleRouter: Router = Router();

createArticleRouter.post("/createArticle", createArticle);

export default createArticleRouter;
