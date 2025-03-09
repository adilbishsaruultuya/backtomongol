import express from "express";
import cors from "cors";
import testRouter from "./routers/test.router";
import getUser from "./routers/getUser.router";
import getCategoriesRouter from "./routers/getCategories.router";
import getArticlesRouter from "./routers/getArticles.router";
import getArticlesByUserRoleRouter from "./routers/getArticlesByUserRole.router";
import { json } from "body-parser";
import authRouter from "./routers/auth.router";
import { authMiddleware } from "./middlewares/auth.middleware";
import createArticleRouter from "./routers/createArticle.router";
import editArticleRouter from "./routers/editArticle.router";
import changeArticleStatusRouter from "./routers/changeArticleStatus.router";
import deleteArticleRouter from "./routers/deleteArticle.router";
const app = express();

app.use(cors());
app.use(json());

// app.use("/", authRouter);
// app.use("/", testRouter);

// // 認証が必要なルート (authMiddleware を特定のルートのみに適用)
// app.use("/user", authMiddleware, getUser);

app.use("/", authRouter);
app.use("/", testRouter);
app.use("/", getCategoriesRouter);
app.use("/", getArticlesRouter);

app.use(authMiddleware);
app.use("/", getArticlesByUserRoleRouter);
app.use("/", createArticleRouter);
app.use("/", editArticleRouter);
app.use("/", changeArticleStatusRouter);
app.use("/", deleteArticleRouter);
app.use("/", getUser);

export default app;
