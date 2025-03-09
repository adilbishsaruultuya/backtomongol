import { Router } from "express";
import { getArticlesByUserRole } from "../controllers";

const getArticlesByUserRoleRouter = Router();

getArticlesByUserRoleRouter.get(
  "/getArticlesByUserRole",
  getArticlesByUserRole
);

export default getArticlesByUserRoleRouter;
