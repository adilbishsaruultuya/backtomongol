import { Router } from "express";
import { changeArticleStatus } from "../controllers";

const changeArticleStatusRouter = Router();

changeArticleStatusRouter.post("/changeArticleStatus/:id", changeArticleStatus);

export default changeArticleStatusRouter;
