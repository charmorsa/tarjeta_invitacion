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
exports.loginPage = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const respJson_1 = require("../libs/respJson");
const admin_1 = require("../models/admin");
const jwt_1 = require("../libs/jwt");
const cli_color_1 = __importDefault(require("cli-color"));
const send_email_controller_1 = require("./send.email.controller");
const loginPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, password } = req.body;
        const fecha = new Date();
        const userSearch = yield admin_1.admin.findOne({ user });
        if (!userSearch)
            return (0, respJson_1.respJson)(res, 400, false, { msg: 'Usuario no Existe' });
        if (!(yield bcrypt_1.default.compare(password, userSearch.password)))
            return (0, respJson_1.respJson)(res, 400, false, { msg: 'Contraseña no Valida' });
        const token = yield (0, jwt_1.generateJWT)(userSearch);
        if (!token)
            return (0, respJson_1.respJson)(res, 400, false, { msg: 'Token no Generado' });
        let text = `se ha Iniciado Sesion en el usuario ${user}, el dia ${fecha}
        gracias por utilizar nuestro sistema
        Walrus-Duck`;
        let type = 'Boda: Walrus-Duck';
        let email = 'natubucher713@gmail.com';
        (0, send_email_controller_1.sendEmail)(email, type, text);
        return (0, respJson_1.respJson)(res, 200, true, { token: token, user: { id: userSearch._id, name: userSearch.name } });
    }
    catch (error) {
        console.error(cli_color_1.default.red('Error, contactese con el administrador', error));
        return (0, respJson_1.respJson)(res, 500, false, { msg: 'Error, contactese con el administrador' });
    }
});
exports.loginPage = loginPage;
//# sourceMappingURL=login.js.map