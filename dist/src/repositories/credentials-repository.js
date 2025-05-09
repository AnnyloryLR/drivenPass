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
exports.deleteCredential = exports.credentialUpdte = exports.getCredentialById = exports.getAllCredentials = exports.newCrendential = exports.getCredentialByTitle = void 0;
const config_1 = __importDefault(require("../database/config"));
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.UUID;
const cryptr = new cryptr_1.default(secretKey);
function getCredentialByTitle(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const exist = yield config_1.default.credential.findFirst({
            where: {
                title: title
            }
        });
        return exist;
    });
}
exports.getCredentialByTitle = getCredentialByTitle;
function newCrendential(credentialData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, url, username, password, userId } = credentialData;
        const encryptedPassword = cryptr.encrypt(password);
        const credential = yield config_1.default.credential.create({
            data: {
                title,
                url,
                username,
                password: encryptedPassword,
                userId
            }
        });
        return credential;
    });
}
exports.newCrendential = newCrendential;
function getAllCredentials() {
    return __awaiter(this, void 0, void 0, function* () {
        const decryptedCredentials = [];
        const credentials = yield config_1.default.credential.findMany();
        for (const credential of credentials) {
            decryptedCredentials.push({
                id: credential.id,
                title: credential.title,
                url: credential.url,
                username: credential.username,
                password: cryptr.decrypt(credential.password),
                userId: credential.userId
            });
        }
        return decryptedCredentials;
    });
}
exports.getAllCredentials = getAllCredentials;
function getCredentialById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential_id = Number(id);
        const credential = yield config_1.default.credential.findFirst({
            where: {
                id: credential_id
            }
        });
        const decryptedCredential = {
            id,
            title: credential.title,
            url: credential.url,
            username: credential.username,
            password: cryptr.decrypt(credential.password),
            userId: credential.userId
        };
        return decryptedCredential;
    });
}
exports.getCredentialById = getCredentialById;
function credentialUpdte(updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, url, username, password, userId } = updateData;
        const credential = yield getCredentialByTitle(title);
        const updatedCredential = yield config_1.default.credential.update({
            where: {
                id: credential.id
            },
            data: {
                id: credential.id,
                title,
                url,
                username,
                password,
                userId
            }
        });
        return updatedCredential;
    });
}
exports.credentialUpdte = credentialUpdte;
function deleteCredential(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential_id = Number(id);
        const deleted = yield config_1.default.credential.delete({
            where: {
                id: credential_id
            }
        });
        return deleted;
    });
}
exports.deleteCredential = deleteCredential;
