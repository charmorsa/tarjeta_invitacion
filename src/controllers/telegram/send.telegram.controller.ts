import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv'
import * as fs from 'fs'
dotenv.config()
const token:string = String(process.env.tokenTelegram)
const bot = new TelegramBot(token, { polling: true })

export let chatIds:string[] = []

export const cargarChatIds = () => {
  if (fs.existsSync('chatIds.json')) {
    chatIds = JSON.parse(fs.readFileSync('chatIds.json', 'utf8'))
  }
}

const guardarChatIds = () => {
  fs.writeFileSync('chatIds.json', JSON.stringify(chatIds, null, 2))
}

const mensaje = 'holaa, te invito a mi boda... bien bañadito y peinadito presentarse el dia 27 de diciembre a las 19:00hs'

export const enviarMensajes = (chatId: TelegramBot.ChatId) => {
    bot.sendMessage(chatId, mensaje).catch(error => {
      console.error(`Error al enviar mensaje a ${chatId}:`, error);
    })
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id.toString()
  if (!chatIds.includes(chatId)) {
    chatIds.push(chatId)
    guardarChatIds()
  }
  enviarMensajes(chatId)
  console.log(`Nuevo chat ID registrado: ${chatId}`)
})