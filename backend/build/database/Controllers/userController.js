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
require("dotenv/config");
const userService_1 = __importDefault(require("../Services/userService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService = new userService_1.default();
const SECRET = process.env.JWT_SECRET || 'secret';
const makeToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: '5h' });
    return token;
};
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userService.getAll();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
const getByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const response = yield userService.getByEmail(email, password);
        if (!response)
            return res.status(404).json({ message: 'User Not Found' });
        const token = makeToken({ id: response.id });
        return res.status(200).json({ token, id: response.id });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield userService.getById(Number(id));
        if (!response)
            return res.status(404).json({ message: 'Id Not Found' });
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const response = yield userService.create({ name, email, password });
        const token = makeToken({ id: response.id });
        return res.status(201).json({ token, id: response.id });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const { id } = req.params;
        const response = yield userService.update({ name, email, password }, Number(id));
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield userService.destroy(Number(id));
        return res.status(204).end();
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.default = {
    getAll,
    getById,
    create,
    update,
    destroy,
    getByEmail,
};
