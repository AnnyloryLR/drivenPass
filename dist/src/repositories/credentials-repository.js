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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentialByTitle = getCredentialByTitle;
exports.newCrendential = newCrendential;
exports.getAllCredentials = getAllCredentials;
exports.getCredentialById = getCredentialById;
exports.credentialUpdte = credentialUpdte;
exports.deleteCredential = deleteCredential;
var config_1 = __importDefault(require("../database/config"));
var cryptr_1 = __importDefault(require("cryptr"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var secretKey = process.env.UUID;
var cryptr = new cryptr_1.default(secretKey);
function getCredentialByTitle(title) {
    return __awaiter(this, void 0, void 0, function () {
        var exist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, config_1.default.credential.findFirst({
                        where: {
                            title: title
                        }
                    })];
                case 1:
                    exist = _a.sent();
                    return [2 /*return*/, exist];
            }
        });
    });
}
function newCrendential(credentialData) {
    return __awaiter(this, void 0, void 0, function () {
        var title, url, username, password, userId, encryptedPassword, credential;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = credentialData.title, url = credentialData.url, username = credentialData.username, password = credentialData.password, userId = credentialData.userId;
                    encryptedPassword = cryptr.encrypt(password);
                    return [4 /*yield*/, config_1.default.credential.create({
                            data: {
                                title: title,
                                url: url,
                                username: username,
                                password: encryptedPassword,
                                userId: userId
                            }
                        })];
                case 1:
                    credential = _a.sent();
                    return [2 /*return*/, credential];
            }
        });
    });
}
function getAllCredentials() {
    return __awaiter(this, void 0, void 0, function () {
        var decryptedCredentials, credentials, _i, credentials_1, credential;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    decryptedCredentials = [];
                    return [4 /*yield*/, config_1.default.credential.findMany()];
                case 1:
                    credentials = _a.sent();
                    for (_i = 0, credentials_1 = credentials; _i < credentials_1.length; _i++) {
                        credential = credentials_1[_i];
                        decryptedCredentials.push({
                            id: credential.id,
                            title: credential.title,
                            url: credential.url,
                            username: credential.username,
                            password: cryptr.decrypt(credential.password),
                            userId: credential.userId
                        });
                    }
                    return [2 /*return*/, decryptedCredentials];
            }
        });
    });
}
function getCredentialById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var credential_id, credential, decryptedCredential;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credential_id = Number(id);
                    return [4 /*yield*/, config_1.default.credential.findFirst({
                            where: {
                                id: credential_id
                            }
                        })];
                case 1:
                    credential = _a.sent();
                    decryptedCredential = {
                        id: id,
                        title: credential.title,
                        url: credential.url,
                        username: credential.username,
                        password: cryptr.decrypt(credential.password),
                        userId: credential.userId
                    };
                    return [2 /*return*/, decryptedCredential];
            }
        });
    });
}
function credentialUpdte(updateData) {
    return __awaiter(this, void 0, void 0, function () {
        var title, url, username, password, userId, credential, updatedCredential;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = updateData.title, url = updateData.url, username = updateData.username, password = updateData.password, userId = updateData.userId;
                    return [4 /*yield*/, getCredentialByTitle(title)];
                case 1:
                    credential = _a.sent();
                    return [4 /*yield*/, config_1.default.credential.update({
                            where: {
                                id: credential.id
                            },
                            data: {
                                id: credential.id,
                                title: title,
                                url: url,
                                username: username,
                                password: password,
                                userId: userId
                            }
                        })];
                case 2:
                    updatedCredential = _a.sent();
                    return [2 /*return*/, updatedCredential];
            }
        });
    });
}
function deleteCredential(id) {
    return __awaiter(this, void 0, void 0, function () {
        var credential_id, deleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credential_id = Number(id);
                    return [4 /*yield*/, config_1.default.credential.delete({
                            where: {
                                id: credential_id
                            }
                        })];
                case 1:
                    deleted = _a.sent();
                    return [2 /*return*/, deleted];
            }
        });
    });
}
