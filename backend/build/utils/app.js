"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userController_1 = __importDefault(require("../database/Controllers/userController"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/users', userController_1.default.getAll);
app.post('/login', userController_1.default.getByEmail);
app.get('/users/:id', userController_1.default.getById);
app.post('/users', userController_1.default.create);
app.put('/users/:id', userController_1.default.update);
app.delete('/users/:id', userController_1.default.destroy);
exports.default = app;
