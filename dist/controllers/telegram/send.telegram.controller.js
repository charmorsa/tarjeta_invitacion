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
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
dotenv_1.default.config();
const token = String(process.env.tokenTelegram);
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
exports.chatIds = [];
const cargarChatIds = () => {
    if (fs.existsSync('chatIds.json')) {
        exports.chatIds = JSON.parse(fs.readFileSync('chatIds.json', 'utf8'));
    }
};
exports.cargarChatIds = cargarChatIds;
const guardarChatIds = () => {
    fs.writeFileSync('chatIds.json', JSON.stringify(exports.chatIds, null, 2));
};
const mensaje = 'holaa, te invito a mi boda... bien bañadito y peinadito presentarse el dia 27 de diciembre a las 19:00hs';
const enviarMensajes = (chatId) => {
    bot.sendMessage(chatId, mensaje).catch(error => {
        console.error(`Error al enviar mensaje a ${chatId}:`, error);
    });
};
exports.enviarMensajes = enviarMensajes;
bot.on('message', (msg) => {
    const chatId = msg.chat.id.toString();
    if (!exports.chatIds.includes(chatId)) {
        exports.chatIds.push(chatId);
        guardarChatIds();
    }
    (0, exports.enviarMensajes)(chatId);
    console.log(`Nuevo chat ID registrado: ${chatId}`);
});
//# sourceMappingURL=send.telegram.controller.js.map