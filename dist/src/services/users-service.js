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
exports.logIn = exports.createUser = void 0;
const errors_1 = require("../errors/errors");
const users_repository_1 = require("../repositories/users-repository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = userData;
        const exist = yield (0, users_repository_1.getUserData)(email);
        if (exist)
            throw (0, errors_1.conflictError)(email);
        const result = yield (0, users_repository_1.signUp)(userData);
        return result;
    });
}
exports.createUser = createUser;
function logIn(signInData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { registeredUser } = yield (0, users_repository_1.signIn)(signInData);
        if (!registeredUser)
            throw (0, errors_1.notFound)(registeredUser.name);
        if (!logIn)
            throw errors_1.unauthorized;
        const token = jsonwebtoken_1.default.sign({ userId: registeredUser.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
        return token;
    });
}
exports.logIn = logIn;
