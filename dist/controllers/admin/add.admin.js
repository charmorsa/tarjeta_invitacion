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
exports.AddAdmin = void 0;
const respJson_1 = require("../../libs/respJson");
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_1 = require("../../models/admin");
const cli_color_1 = __importDefault(require("cli-color"));
const AddAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = String(req.body.user);
        let password = String(req.body.password);
        let name = String(req.body.name);
        const ex = yield admin_1.admin.exists({ user, name });
        if (ex)
            return (0, respJson_1.respJson)(res, 400, false, { msg: 'Usuario Existente' });
        const salt = bcrypt_1.default.genSaltSync(10);
        const hash = bcrypt_1.default.hashSync(password, salt);
        const userDB = yield new admin_1.admin({ user, password: hash, name }).save();
        if (!userDB)
            return (0, respJson_1.respJson)(res, 400, false, { msg: '## Error al crear un usuario nuevo ##' });
        console.log(cli_color_1.default.cyan('Exito al Cargar', userDB));
        return (0, respJson_1.respJson)(res, 200, true, { data: 'Exito al Cargar', userDB });
    }
    catch (error) {
        console.error(cli_color_1.default.red('Error, contactese con el administrador', error));
        return (0, respJson_1.respJson)(res, 500, false, { msg: 'Error, contactese con el administrador' });
    }
});
exports.AddAdmin = AddAdmin;
//# sourceMappingURL=add.admin.js.map