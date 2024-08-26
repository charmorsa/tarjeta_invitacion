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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaIDS = void 0;
const send_telegram_controller_1 = require("./send.telegram.controller");
const respJson_1 = require("../../libs/respJson");
const listaIDS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, respJson_1.respJson)(res, 200, true, { msg: send_telegram_controller_1.chatIds });
    }
    catch (error) {
        return (0, respJson_1.respJson)(res, 500, false, { msg: 'Error, constactese con el administrador' });
    }
});
exports.listaIDS = listaIDS;
//# sourceMappingURL=list.IDs.controller.js.map