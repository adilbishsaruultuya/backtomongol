"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getTest_controller_1 = require("../controllers/getTest.controller");
const testRouter = (0, express_1.Router)();
testRouter.get("/test", getTest_controller_1.getAllTests);
exports.default = testRouter;
