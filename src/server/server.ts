import express from 'express'
import path from 'path'
import * as dotenv from 'dotenv'
import cors from 'cors'

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
        const corsOptions = {
            origin: 'https://nuestra-boda-natuycharly.web.app',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
            optionsSuccessStatus: 204
        }
        this.app.use(cors(corsOptions));
        this.publicFolder();
        dotenv.config();
        this.app.listen(this.port, callback)
    }   
}

