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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCredential = createCredential;
exports.readAllCredentials = readAllCredentials;
exports.readCredentialById = readCredentialById;
exports.updateCredential = updateCredential;
exports.credentialDeletion = credentialDeletion;
const errors_1 = require("../errors/errors");
const credentials_repository_1 = require("../repositories/credentials-repository");
function createCredential(credentialData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, userId } = credentialData;
        const titleExistent = yield (0, credentials_repository_1.getCredentialByTitle)(title);
        if (titleExistent && titleExistent.userId == userId)
            throw (0, errors_1.conflictError)(title);
        const result = yield (0, credentials_repository_1.newCrendential)(credentialData);
        return result;
    });
}
function readAllCredentials() {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = yield (0, credentials_repository_1.getAllCredentials)();
        return credentials;
    });
}
function readCredentialById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield (0, credentials_repository_1.getCredentialById)(id);
        if (!credential)
            throw errors_1.notFound;
        return credential;
    });
}
function updateCredential(updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title } = updateData;
        const credential = yield (0, credentials_repository_1.getCredentialByTitle)(title);
        if (!credential)
            throw errors_1.notFound;
        const result = yield (0, credentials_repository_1.credentialUpdte)(updateData);
        return result;
    });
}
function credentialDeletion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield (0, credentials_repository_1.getCredentialById)(id);
        if (!credential)
            throw errors_1.notFound;
        const result = yield (0, credentials_repository_1.deleteCredential)(id);
        return result;
    });
}
