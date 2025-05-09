"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_middleware_1 = __importDefault(require("../middlewares/errorHandler-middleware"));
const erase_controller_1 = require("../controllers/erase-controller");
const express_1 = require("express");
const eraseRouter = (0, express_1.Router)();
eraseRouter.use(errorHandler_middleware_1.default);
eraseRouter.delete("/delete", erase_controller_1.eraseAccount);
exports.default = eraseRouter;
