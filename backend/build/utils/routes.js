"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../database/Controllers/userController"));
const userMidd_1 = __importDefault(require("../database/middlewares/userMidd"));
const router = express_1.default.Router();
router.get('/users', userController_1.default.getAll);
router.get('/users/:id', userController_1.default.getById);
router.post('/login', userMidd_1.default.validateLogin, userController_1.default.getByEmail);
router.post('/users', userMidd_1.default.validateLogin, userMidd_1.default.validateRegister, userController_1.default.create);
router.put('/users/:id', userMidd_1.default.validateId, userController_1.default.update);
router.delete('/users/:id', userMidd_1.default.validateId, userController_1.default.destroy);
exports.default = router;
