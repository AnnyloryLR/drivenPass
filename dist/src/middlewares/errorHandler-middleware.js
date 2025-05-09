"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
function errorHandler(error, req, res, next) {
    if (error.type === "conflict") {
        res.status(409).send(error.message);
        return;
    }
    if (error.type === "notFound") {
        res.status(404).send(error.message);
        return;
    }
    if (error.type === "UnprocessableEntity") {
        res.status(422).send(error.message);
        return;
    }
    if (error.type === "badRequest") {
        res.status(400).send(error.message);
        return;
    }
    res.status(500).send(error.message);
    next();
}
