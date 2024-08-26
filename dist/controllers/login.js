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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPage = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var respJson_1 = require("../libs/respJson");
var admin_1 = require("../models/admin");
var jwt_1 = require("../libs/jwt");
var cli_color_1 = __importDefault(require("cli-color"));
var send_email_controller_1 = require("./send.email.controller");
var loginPage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, password, fecha, userSearch, token, text, type, email, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, user = _a.user, password = _a.password;
                fecha = new Date();
                return [4 /*yield*/, admin_1.admin.findOne({ user: user })];
            case 1:
                userSearch = _b.sent();
                if (!userSearch)
                    return [2 /*return*/, (0, respJson_1.respJson)(res, 400, false, { msg: 'Usuario no Existe' })];
                return [4 /*yield*/, bcrypt_1.default.compare(password, userSearch.password)];
            case 2:
                if (!(_b.sent()))
                    return [2 /*return*/, (0, respJson_1.respJson)(res, 400, false, { msg: 'Contraseña no Valida' })];
                return [4 /*yield*/, (0, jwt_1.generateJWT)(userSearch)];
            case 3:
                token = _b.sent();
                if (!token)
                    return [2 /*return*/, (0, respJson_1.respJson)(res, 400, false, { msg: 'Token no Generado' })];
                text = "se ha Iniciado Sesion en el usuario ".concat(user, ", el dia ").concat(fecha, "\n        gracias por utilizar nuestro sistema\n        Walrus-Duck");
                type = 'Boda: Walrus-Duck';
                email = 'natubucher713@gmail.com';
                (0, send_email_controller_1.sendEmail)(email, type, text);
                return [2 /*return*/, (0, respJson_1.respJson)(res, 200, true, { token: token, user: { id: userSearch._id, name: userSearch.name } })];
            case 4:
                error_1 = _b.sent();
                console.error(cli_color_1.default.red('Error, contactese con el administrador', error_1));
                return [2 /*return*/, (0, respJson_1.respJson)(res, 500, false, { msg: 'Error, contactese con el administrador' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginPage = loginPage;
//# sourceMappingURL=login.js.map