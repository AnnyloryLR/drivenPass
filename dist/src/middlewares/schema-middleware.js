"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidate = schemaValidate;
const http_status_1 = __importDefault(require("http-status"));
function schemaValidate(schema) {
    return (req, res, next) => {
        const body = req.body;
        const validation = schema.validate(body);
        if (validation.error) {
            res.status(http_status_1.default.UNPROCESSABLE_ENTITY)
                .send(validation.error.details.map(detail => detail.message));
        }
        next();
    };
}
