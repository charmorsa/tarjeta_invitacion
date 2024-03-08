import express from 'express'
import Server from "./server/server"
import mongo from './databases/mongoDB'
import {index}  from './routes/index'
import dotenv from 'dotenv'
import cors from 'cors'
import clc from 'cli-color'

dotenv.config()
const puerto:number = Number(process.env.PORT)
const server = Server.init(puerto)
const mb:string = String(process.env.MONGODB_URI)

async function main(){   
    await mongo(mb)
    server.app.use(cors())
    server.app.use(express.json())
    server.app.use('/', index)
    server.start(() => { 
        console.log(clc.magenta(' ============================================ ')),
        console.log(clc.yellow(` ======   Server Start at Port :${puerto}   ====== `)),
        console.log(clc.cyan(` ======         Mongo conected         ====== `)),
        console.log(clc.magenta(' ============================================ '))
    })    
}

main()
