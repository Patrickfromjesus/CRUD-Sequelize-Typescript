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
const UserModel_1 = __importDefault(require("../models/UserModel"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield UserModel_1.default.findAll();
    return data;
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof id === 'number') {
        const data = yield UserModel_1.default.findOne({ where: { id } });
        return data;
    }
    const data = yield UserModel_1.default.findOne({ where: { email: id } });
    return data;
});
const create = (infos) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield UserModel_1.default.create(Object.assign({}, infos));
    return data;
});
const update = (infos, id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield UserModel_1.default.update(Object.assign({}, infos), { where: { id } });
    return data;
});
const destroy = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserModel_1.default.destroy({ where: { id } });
    return;
});
const getByEmail = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield UserModel_1.default.findOne({ where: { email, password } });
    return data;
});
exports.default = {
    getAll,
    getById,
    create,
    update,
    destroy,
    getByEmail,
};
