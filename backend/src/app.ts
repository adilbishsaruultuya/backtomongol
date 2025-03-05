import express from "express";
import cors from "cors";
import testRouter from "./routers/test.router";
import getUser from "./routers/getUser.router";
import { json } from "body-parser";
import authRouter from "./routers/auth.router";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();

app.use(cors());
app.use(json());

app.use("/", authRouter);
app.use("/", testRouter);

app.use(authMiddleware);

app.use("/", getUser);

// app.use("/", authRouter);
// app.use("/", testRouter);

// // 認証が必要なルート (authMiddleware を特定のルートのみに適用)
// app.use("/user", authMiddleware, getUser);

export default app;
