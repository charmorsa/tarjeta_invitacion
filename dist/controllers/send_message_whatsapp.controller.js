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
const puppeteer = __importStar(require("puppeteer"));
const sendMessage = (page, to, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield page.goto('https://web.whatsapp.com/');
        yield page.waitForSelector('._1awRl');
        yield page.click('._1awRl');
        yield page.waitForSelector('._2S1VP');
        yield page.type('._2S1VP', to);
        //await page.waitForTimeout(2000); // Espera para cargar los resultados de búsqueda
        yield page.click(`span[title="${to}"]`);
        yield page.waitForSelector('._3u328');
        yield page.type('._3u328', message);
        yield page.keyboard.press('Enter');
        console.log('Mensaje enviado a', to);
    }
    catch (error) {
        console.error('Error al enviar mensaje a', to, error);
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({ headless: false }); // Cambia a true si no quieres ver el navegador
    const page = yield browser.newPage();
    const numbers = [
        '12345678901',
        '19876543210',
        // Agrega más números según sea necesario
    ];
    const message = 'Hola, este es un mensaje de prueba desde TypeScript!';
    for (const number of numbers) {
        yield sendMessage(page, number, message);
    }
    yield browser.close();
});
main();
//# sourceMappingURL=send_message_whatsapp.controller.js.map