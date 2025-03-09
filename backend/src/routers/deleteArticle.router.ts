import { Router } from "express";
import { deleteArticle } from "../controllers/mutations/deleteArticle.controller";

const deleteArticleRouter = Router();

deleteArticleRouter.delete("/deleteArticle/:id", deleteArticle);

export default deleteArticleRouter;
