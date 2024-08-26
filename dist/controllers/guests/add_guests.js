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
exports.AddGuests = void 0;
const respJson_1 = require("../../libs/respJson");
const invitados_1 = require("../../models/invitados");
const cli_color_1 = __importDefault(require("cli-color"));
const generate_codigo_controller_1 = require("../generate.codigo.controller");
const AddGuests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codigo = (0, generate_codigo_controller_1.generateCode)();
        const nombre = String(req.body.nombre);
        const apellido = String(req.body.apellido);
        const ex = yield invitados_1.inv.exists({ nombre, apellido });
        if (ex)
            return (0, respJson_1.respJson)(res, 400, false, { msg: 'Invitado ya existe' });
        const result = yield new invitados_1.inv({ codigo, nombre, apellido }).save();
        if (!result)
            return (0, respJson_1.respJson)(res, 400, false, { msg: 'Error al cargar Invitado' });
        return (0, respJson_1.respJson)(res, 200, true, { msg: 'Carga exitosa', codigo: codigo });
    }
    catch (error) {
        console.error(cli_color_1.default.red('Error, contactese con el administrador', error));
        return (0, respJson_1.respJson)(res, 500, false, { msg: 'Error, contactese con el administrador' });
    }
});
exports.AddGuests = AddGuests;
//# sourceMappingURL=add_guests.js.map