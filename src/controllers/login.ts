import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { respJson } from "../libs/respJson"
import {admin} from "../models/admin"
import {generateJWT} from '../libs/jwt'
import clc from "cli-color"
import { sendMessage } from "../config/rabbit/sent.message"
import { startServer } from '../server/server'
import { logReq } from "../models/logs.request"
import { logRes } from "../models/logs.response"
import { logError } from "../models/logs.error"

const client = startServer()

export const loginPage =async (req:Request, res:Response) => {
    const { user, password } = req.body
    const dateRegister = new Date()
    try {
        await new logReq({user, dateRegister, type:"Request Login", data:req.body}).save()

        const insert = await returnRedisDisplay(user)
        if(!insert) {
            inserRedisDisplay(user)

        }else return respJson(res,400,false,{msg:'Por favor, aguarde un minuto'})
        const fecha = new Date()
        const userSearch = await admin.findOne({ user })
        if (!userSearch) return respJson(res,400,false,{ msg: 'Usuario no Existe'}) 
        if(!await bcrypt.compare(password, userSearch.password)) return respJson(res,400,false,{ msg: 'Contraseña no Valida'})

        const token = await generateJWT(userSearch)
        if(!token) return respJson(res,400,false,{ msg: 'Token no Generado' }) 

        let text = [ 
            `se ha Iniciado Sesion en el usuario ${user}`, 
            `Fecha ${fecha}`,
            `Gracias por utilizar nuestro sistema Walrus-Duck`,
            `2025`
        ]
        let type = 'Boda: Walrus & Duck'
        let email = '10.0charly@gmail.com'
        let messages = `${email}_${type}_${text}`
        
        await sendMessage('cola', messages)

        const data = {id: userSearch._id, name: userSearch.name}
        await new logRes({user, dateRegister, type:"Response Login", data}).save()

        return respJson(res,200,true,{ token, user:data })
    } catch (error) {
        console.error(clc.red('Error API Login ',error))
        await new logError({user, dateRegister, type:"Error Login", data:error}).save()
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }
}

async function inserRedisDisplay(email:string) {
    try {	
        const key = 'login:' + email
        const value = email
        await client.set(key, value)
        await client.expire(key, 20)
    } catch (error) {
        console.error(clc.red('### Error Redis Insert ###'))
        console.log(error)
        console.error(clc.red('### ------------------ ###'))
        return false
    }
}

async function returnRedisDisplay (email:string) {
    try {
        const keys = await client.keys(`login:${email}`)
        if (keys.length == 0) return false
        return true
    } catch (error) {
        console.error(clc.red('### Error Redis Return ###'))
        console.log(error)
        console.error(clc.red('### ------------------ ###'))
        return false
    }
}