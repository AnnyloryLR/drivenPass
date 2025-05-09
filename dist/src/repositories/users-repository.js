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
exports.getUserData = getUserData;
exports.signUp = signUp;
exports.signIn = signIn;
const config_1 = __importDefault(require("../database/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function getUserData(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield config_1.default.user.findFirst({
            where: {
                email: email
            }
        });
        return result;
    });
}
function signUp(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = userData;
        const user = yield config_1.default.user.create({
            data: {
                name,
                email,
                password: bcrypt_1.default.hashSync(password, 10)
            }
        });
        return user;
    });
}
function signIn(signInData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = signInData;
        const registeredUser = yield config_1.default.user.findFirst({
            where: {
                email: email
            }
        });
        const logIn = bcrypt_1.default.compareSync(registeredUser.password, password);
        return { registeredUser, logIn };
    });
}
