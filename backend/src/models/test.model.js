"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModel = void 0;
const mongoose_1 = require("mongoose");
const testSchema = new mongoose_1.Schema({
    test: {
        type: String,
        required: true,
    },
}, { collection: "test" });
exports.TestModel = (0, mongoose_1.model)("Test", testSchema);
