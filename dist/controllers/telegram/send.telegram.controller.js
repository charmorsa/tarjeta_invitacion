"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarMensajes = exports.cargarChatIds = exports.chatIds = void 0;
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var dotenv_1 = __importDefault(require("dotenv"));
var fs = __importStar(require("fs"));
dotenv_1.default.config();
var token = String(process.env.tokenTelegram);
var bot = new node_telegram_bot_api_1.default(token, { polling: true });
exports.chatIds = [];
var cargarChatIds = function () {
    if (fs.existsSync('chatIds.json')) {
        exports.chatIds = JSON.parse(fs.readFileSync('chatIds.json', 'utf8'));
    }
};
exports.cargarChatIds = cargarChatIds;
var guardarChatIds = function () {
    fs.writeFileSync('chatIds.json', JSON.stringify(exports.chatIds, null, 2));
};
var mensaje = 'holaa, te invito a mi boda... bien bañadito y peinadito presentarse el dia 27 de diciembre a las 19:00hs';
var enviarMensajes = function (chatId) {
    bot.sendMessage(chatId, mensaje).catch(function (error) {
        console.error("Error al enviar mensaje a ".concat(chatId, ":"), error);
    });
};
exports.enviarMensajes = enviarMensajes;
bot.on('message', function (msg) {
    var chatId = msg.chat.id.toString();
    if (!exports.chatIds.includes(chatId)) {
        exports.chatIds.push(chatId);
        guardarChatIds();
    }
    (0, exports.enviarMensajes)(chatId);
    console.log("Nuevo chat ID registrado: ".concat(chatId));
});
//# sourceMappingURL=send.telegram.controller.js.map