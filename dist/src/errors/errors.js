"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorized = exports.badRequest = exports.unprocessableEntity = exports.notFound = exports.conflictError = void 0;
function conflictError(entity) {
    return {
        type: "conflict",
        message: `${entity} já existe!`
    };
}
exports.conflictError = conflictError;
function notFound(entity) {
    return {
        type: "notFound",
        message: `${entity} não existe!`
    };
}
exports.notFound = notFound;
function unprocessableEntity() {
    return {
        type: "UnprocessableEntity",
        message: "não é possível processar esse tipo de dado!"
    };
}
exports.unprocessableEntity = unprocessableEntity;
function badRequest() {
    return {
        type: "badRequest",
        message: "esta operação não pode ser realizada!"
    };
}
exports.badRequest = badRequest;
function unauthorized() {
    return {
        type: "Unauthorized",
        message: "email e/ou senha inválido(s)!"
    };
}
exports.unauthorized = unauthorized;
