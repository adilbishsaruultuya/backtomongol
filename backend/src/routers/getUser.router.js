"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const getUserRouter = (0, express_1.Router)();
getUserRouter.get("/getUser", controllers_1.getUser);
exports.default = getUserRouter;
