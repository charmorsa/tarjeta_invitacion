import admin from 'firebase-admin';
import express from 'express'
import path from 'path'
import clc from 'cli-color'
import { createClient } from 'redis'
import * as dotenv from 'dotenv'

export default class Server {
    public app: express.Application
    public port: number
    public tokenFireBase: string

    constructor(port: number) {
        this.port = port
        this.app = express()
        this.tokenFireBase=""
    }
    static init (port: number) {
        return new Server(port)
    }
    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public')
        this.app.use(express.static(publicPath))
    }

    start(callback: () => void) {
        this.publicFolder();
        dotenv.config();
        this.app.listen(this.port, callback)
    }   
}

export const startServer = () => {
    const client = createClient({"disableOfflineQueue":true, url:process.env.REDISURL});
    client.connect()
    client.on("error",_err=>{})
    client.on("connect",()=>console.log("info","Redis:",clc.green("online")))
    client.on("end",()=>console.log("error","redis cerro"))
    return client
}
