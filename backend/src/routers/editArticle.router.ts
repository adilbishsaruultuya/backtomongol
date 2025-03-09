import { Router } from "express";
import { editArticle } from "../controllers";

const editArticleRouter = Router();

editArticleRouter.post("/editArticle/:id", editArticle);

export default editArticleRouter;
