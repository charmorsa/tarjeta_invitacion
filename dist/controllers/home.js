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
exports.homePage = void 0;
const respJson_1 = require("../libs/respJson");
const send_email_controller_1 = require("./send.email.controller");
const homePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let text = ``;
        let type = 'Boda: Walrus-Duck';
        let email = 'natubucher713@gmail.com';
        (0, send_email_controller_1.sendEmail)(email, type, text);
        return (0, respJson_1.respJson)(res, 200, true, { msg: 'home' });
    }
    catch (error) {
        return (0, respJson_1.respJson)(res, 500, false, { msg: error });
    }
});
exports.homePage = homePage;
//# sourceMappingURL=home.js.map