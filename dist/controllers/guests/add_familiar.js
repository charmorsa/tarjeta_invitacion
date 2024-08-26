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
exports.AddFamili = void 0;
var respJson_1 = require("../../libs/respJson");
var invitados_1 = require("../../models/invitados");
var cli_color_1 = __importDefault(require("cli-color"));
var generate_codigo_controller_1 = require("../generate.codigo.controller");
var AddFamili = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var codigo, familiar, code, result, family, i, up, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                codigo = req.body.codigo;
                familiar = req.body.familiar;
                code = (0, generate_codigo_controller_1.generateCode)();
                return [4 /*yield*/, invitados_1.inv.findOne({ codigo: codigo })];
            case 1:
                result = _a.sent();
                if (!result)
                    return [2 /*return*/, (0, respJson_1.respJson)(res, 400, false, { msg: 'No se encontro familiar' })];
                family = result.familiar;
                for (i = 0; i < family.length; i++) {
                    if (familiar.nombre == family[i].nombre && familiar.apellido == family[i].apellido)
                        return [2 /*return*/, (0, respJson_1.respJson)(res, 400, false, { msg: 'Familiar ya registrado' })];
                }
                familiar.codigo = code;
                return [4 /*yield*/, invitados_1.inv.findByIdAndUpdate({ _id: result._id }, { $push: { familiar: familiar } })];
            case 2:
                up = _a.sent();
                if (!up)
                    return [2 /*return*/, (0, respJson_1.respJson)(res, 400, false, { msg: 'Error al agregar familiar' })];
                return [2 /*return*/, (0, respJson_1.respJson)(res, 200, true, { datos: 'exito al cargar familiar' })];
            case 3:
                error_1 = _a.sent();
                console.error(cli_color_1.default.red('Error, contactese con el administrador', error_1));
                return [2 /*return*/, (0, respJson_1.respJson)(res, 500, false, { msg: 'Error, contactese con el administrador' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.AddFamili = AddFamili;
//# sourceMappingURL=add_familiar.js.map