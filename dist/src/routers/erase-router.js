"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler_middleware_1 = __importDefault(require("../middlewares/errorHandler-middleware"));
var erase_controller_1 = require("../controllers/erase-controller");
var express_1 = require("express");
var eraseRouter = (0, express_1.Router)();
eraseRouter.use(errorHandler_middleware_1.default);
eraseRouter.delete("/delete", erase_controller_1.eraseAccount);
exports.default = eraseRouter;
