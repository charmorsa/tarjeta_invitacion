import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { respJson } from "../libs/respJson"
import {admin} from "../models/admin"
import {generateJWT} from '../libs/jwt'
import clc from "cli-color"
import { sendMessage } from "../config/rabbit/sent.message"

export const loginPage =async (req:Request, res:Response) => {
    try {
        const { user, password } = req.body
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
        return respJson(res,200,true,{ token, user: {id: userSearch._id, name: userSearch.name} })
    } catch (error) {
        console.error(clc.red('Error API Login ',error))
        return respJson(res,500,false,{msg:'Error, contactese con el administrador'})
    }
}