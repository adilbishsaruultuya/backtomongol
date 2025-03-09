import { Router } from "express";
import { getCategories } from "../controllers";

const getCategoriesRouter = Router();

getCategoriesRouter.get("/getCategories", getCategories);

export default getCategoriesRouter;
