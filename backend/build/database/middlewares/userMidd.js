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
const userService_1 = __importDefault(require("../Services/userService"));
const userService = new userService_1.default();
const validateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        return res.status(400).json({ message: 'Invalid Email!' });
    }
    if (!req.body.password) {
        return res.status(400).json({ message: 'Invalid Password!' });
    }
    return next();
});
const validateRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name) {
        return res.status(400).json({ message: 'Name must be provided!' });
    }
    return next();
});
const validateId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield userService.getById(Number(id));
    if (!data)
        return res.status(404).json({ message: 'User Not Found.' });
    next();
});
exports.default = {
    validateLogin,
    validateRegister,
    validateId,
};
