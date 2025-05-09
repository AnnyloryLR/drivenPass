"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCredential = exports.credentialUpdate = exports.getCredentialById = exports.getAllCredentials = exports.newCredential = void 0;
const credentials_service_1 = require("../services/credentials-service");
const http_status_1 = __importDefault(require("http-status"));
function newCredential(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, url, username, password } = req.body;
        const userId = res.locals.user.id;
        const credentialData = {
            title,
            url,
            username,
            password,
            userId
        };
        yield (0, credentials_service_1.createCredential)(credentialData);
        res.sendStatus(http_status_1.default.CREATED);
    });
}
exports.newCredential = newCredential;
function getAllCredentials(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, credentials_service_1.readAllCredentials)();
        res.status(200).send(result);
    });
}
exports.getAllCredentials = getAllCredentials;
function getCredentialById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield (0, credentials_service_1.readCredentialById)(id);
        res.status(200).send(result);
    });
}
exports.getCredentialById = getCredentialById;
function credentialUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, url, username, password } = req.body;
        const userId = res.locals.user.id;
        const credentialData = {
            title,
            url,
            username,
            password,
            userId
        };
        const result = yield (0, credentials_service_1.updateCredential)(credentialData);
        res.status(204).send(result);
    });
}
exports.credentialUpdate = credentialUpdate;
function deleteCredential(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield (0, credentials_service_1.credentialDeletion)(id);
        res.status(204).send(result);
    });
}
exports.deleteCredential = deleteCredential;
