"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conflictError = conflictError;
exports.notFound = notFound;
exports.unprocessableEntity = unprocessableEntity;
exports.badRequest = badRequest;
exports.unauthorized = unauthorized;
function conflictError(entity) {
    return {
        type: "conflict",
        message: `${entity} já existe!`
    };
}
function notFound() {
    return {
        type: "notFound",
        message: `não encontrado!`
    };
}
function unprocessableEntity() {
    return {
        type: "UnprocessableEntity",
        message: "não é possível processar esse tipo de dado!"
    };
}
function badRequest() {
    return {
        type: "badRequest",
        message: "esta operação não pode ser realizada!"
    };
}
function unauthorized() {
    return {
        type: "Unauthorized",
        message: "email e/ou senha inválido(s)!"
    };
}
