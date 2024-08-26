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
exports.AddFamili = void 0;
const respJson_1 = require("../../libs/respJson");
const invitados_1 = require("../../models/invitados");
const cli_color_1 = __importDefault(require("cli-color"));
const generate_codigo_controller_1 = require("../generate.codigo.controller");
const AddFamili = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codigo = req.body.codigo;
        const familiar = req.body.familiar;
        const code = (0, generate_codigo_controller_1.generateCode)();
        const result = yield invitados_1.inv.findOne({ codigo });
        if (!result)
            return (0, respJson_1.respJson)(res, 400, false, { msg: 'No se encontro familiar' });
        const family = result.familiar;
        for (let i = 0; i < family.length; i++) {
            if (familiar.nombre == family[i].nombre && familiar.apellido == family[i].apellido)
                return (0, respJson_1.respJson)(res, 400, false, { msg: 'Familiar ya registrado' });
        }
        familiar.codigo = code;
        const up = yield invitados_1.inv.findByIdAndUpdate({ _id: result._id }, { $push: { familiar } });
        if (!up)
            return (0, respJson_1.respJson)(res, 400, false, { msg: 'Error al agregar familiar' });
        return (0, respJson_1.respJson)(res, 200, true, { datos: 'exito al cargar familiar' });
    }
    catch (error) {
        console.error(cli_color_1.default.red('Error, contactese con el administrador', error));
        return (0, respJson_1.respJson)(res, 500, false, { msg: 'Error, contactese con el administrador' });
    }
});
exports.AddFamili = AddFamili;
//# sourceMappingURL=add_familiar.js.map