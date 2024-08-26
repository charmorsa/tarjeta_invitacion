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
exports.validateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('TOKEN');
    if (!token)
        return res.status(401).json({ ok: false, status: 401, msg: 'No hay Token en la Petición' });
    try {
        const { id, name, last_name } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
        req.body.jwt = { id, name, last_name };
    }
    catch (err) {
        return res.status(401).json({ ok: false, status: 401, msg: 'Token Invalido' });
    }
    next();
});
exports.validateJwt = validateJwt;
//# sourceMappingURL=validateToken.middleware.js.map