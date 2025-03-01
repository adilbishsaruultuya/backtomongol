import express from "express";
import cors from "cors";
import testRouter from "./routers/test.router";
import { json } from "body-parser";

const app = express();

app.use(cors());
app.use(json());

app.use("/", testRouter);
export default app;
