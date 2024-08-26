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
exports.ListGuests = void 0;
const respJson_1 = require("../../libs/respJson");
const invitados_1 = require("../../models/invitados");
const cli_color_1 = __importDefault(require("cli-color"));
const ListGuests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield invitados_1.inv.find({});
        if (result.length == 0)
            return (0, respJson_1.respJson)(res, 400, false, { msg: 'Error en la Consulta a la base de datos' });
        return (0, respJson_1.respJson)(res, 200, true, { msg: result });
    }
    catch (error) {
        console.error(cli_color_1.default.red('Error, contactese con el administrador', error));
        return (0, respJson_1.respJson)(res, 500, false, { msg: 'Error, contactese con el administrador' });
    }
});
exports.ListGuests = ListGuests;
//# sourceMappingURL=list_guests.js.map